import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Associate the post with a user's email
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;