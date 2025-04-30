import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    joinedClubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club", // Reference the Club model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
// Profile is the name of the model, and profileSchema is the schema we created above
// The first argument is the name of the model, and the second argument is the schema we created above
// The name of the model is the name of the collection in the database, and mongoose will automatically pluralize it
// Here the model name is "Profile", mongoose will create a collection named "profiles" in the database
export default Profile;