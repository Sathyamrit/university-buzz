import mongoose from 'mongoose';
import Profile from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  const profile = req.body; //user will send the profile data in the body of the request

  if(!profile.name || !profile.email) {
    return res.status(400).json({ success:false,  message: 'Name and email are required' });
    // return res.status(400).json({ message: 'Profile data is required' });
  }

  const newProfile = new Profile(profile); //create a new profile object using the Profile model

  try {
    await newProfile.save(); //save the profile to the database
    res.status(201).json({ success: true, message: 'Profile created successfully', data: newProfile });
  }
  catch (error) {
    console.error("Error in Create Profile", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};