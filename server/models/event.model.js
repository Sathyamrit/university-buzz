import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  } // timestamps: true will add createdAt and updatedAt fields automatically
);

const Event = mongoose.model("Event", postSchema);
export default Event;