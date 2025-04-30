import bcrypt from "bcrypt";
import Profile from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, email, and password are required",
      });
  }

  try {
    // Check if the email already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new profile
    const newProfile = new Profile({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newProfile.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Profile created successfully",
        data: newProfile,
      });
  } catch (error) {
    console.error("Error in Create Profile:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const loginProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await Profile.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { ...userData, type: "user" }, // Add type field
    });
  } catch (error) {
    console.error("Error in Login Profile:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const joinClub = async (req, res) => {
  const { userId, clubId } = req.body;

  if (!userId || !clubId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID and Club ID are required" });
  }

  try {
    const user = await Profile.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the club is already joined
    if (user.joinedClubs.includes(clubId)) {
      return res
        .status(400)
        .json({ success: false, message: "Club already joined" });
    }

    // Add the club to the joinedClubs array
    user.joinedClubs.push(clubId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Club joined successfully", data: user });
  } catch (error) {
    console.error("Error joining club:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getJoinedClubs = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Profile.findById(id).populate("joinedClubs"); // Populate joinedClubs with club details
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.joinedClubs });
  } catch (error) {
    console.error("Error fetching joined clubs:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
