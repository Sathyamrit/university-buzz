import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Profile from './models/profile.model.js'; //import the Profile model

dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse JSON data from incoming requests

app.post('/api/profiles', async (req, res) => {
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
});

app.post('/profile', (req, res) => {
  res.send('profile is running'); 
});

// console.log(process.env.MONGO_URI);

// app.listen(5000, () => {
//   connectDB();
//   console.log('Server is running on port 5000');
//   console.log('click http://localhost:5000 to visit the server');
// });

const startServer = async () => {
  try {
    await connectDB(); //connect to the database
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
      console.log('click http://localhost:5000 to visit the server');
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer(); //call the startServer function to start the server and connect to the database
