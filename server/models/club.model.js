import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
    },
    members: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
    },
    whatWeDo: {
      type: String,
    },
    clubFounderName: {
      type: String,
    },
    clubFounderBranch: {
      type: String,
    },
    clubFounderTitle: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
