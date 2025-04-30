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
      type: String, // For user posts
      default: null,
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId, // For club posts
      ref: "Club",
      default: null,
    },
    type: {
      type: String,
      enum: ["user", "club"], // To differentiate between user and club posts
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
