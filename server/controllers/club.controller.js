import bcrypt from "bcrypt";
import Club from "../models/club.model.js";

export const createClub = async (req, res) => {
  const { name, description, tags, members, image, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name and password are required" });
  }

  try {
    // Check if the club already exists
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res
        .status(400)
        .json({ success: false, message: "Club already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new club
    const newClub = new Club({
      name,
      description,
      tags,
      members,
      image,
      password: hashedPassword,
    });

    await newClub.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Club created successfully",
        data: newClub,
      });
  } catch (error) {
    console.error("Error in Create Club:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find(); // Fetch all clubs from the database
    res.status(200).json({ success: true, data: clubs });
  } catch (error) {
    console.error("Error fetching clubs:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const loginClub = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const club = await Club.findOne({ name: email }); // Assuming club name is used as the email
    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    const isMatch = await bcrypt.compare(password, club.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { password: _, ...clubData } = club.toObject();
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { ...clubData, type: "club" }, // Add type field
    });
  } catch (error) {
    console.error("Error in Login Club:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
