import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const post = req.body; //user will send the post data in the body of the request

  if (!post.title || !post.content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  const newPost = new Post(post); //create a new post object using the Post model

  try {
    await newPost.save(); //save the post to the database
    res.status(201).json({ success: true, message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error in Create Post", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find(); //find all posts in the database
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in Get Post", error.message); //log the error message to the console
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

