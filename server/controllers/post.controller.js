import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, content, email, clubId } = req.body; // Extract data from the request body

  // Validate required fields
  if (!title || !content || (!email && !clubId)) {
    return res.status(400).json({
      success: false,
      message: "Title, content, and either email or clubId are required",
    });
  }

  try {
    // Create a new post object
    const newPost = new Post({
      title,
      content,
      email: email || null, // Set email if provided
      clubId: clubId || null, // Set clubId if provided
    });

    // Save the post to the database
    await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error in Create Post:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { email } = req.query; // Get the email from query parameters

  try {
    let posts;
    if (email) {
      // Fetch posts for the specific user
      posts = await Post.find({ email });
    } else {
      // Fetch all posts
      posts = await Post.find();
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getPostsByClub = async (req, res) => {
  const { clubId } = req.params; // Get the clubId from the request parameters

  if (!mongoose.Types.ObjectId.isValid(clubId)) {
    return res.status(400).json({ success: false, message: "Invalid club ID" });
  }

  try {
    // Fetch posts associated with the given clubId
    const posts = await Post.find({ clubId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found for this club" });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts by club:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params; //get the id from the request parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id); //find the post by ID and delete it
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted successfully", data: deletedPost });
  } catch (error) {
    console.error("Error in Delete Post", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

