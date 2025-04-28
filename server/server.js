import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
// import Profile from './models/profile.model.js'; //import the Profile model
// import { profile } from 'console';
import profileRoutes from './routes/profile.route.js'; //import the profile routes

dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse JSON data from incoming requests

app.use("/api/profiles", profileRoutes); //use the profileRoutes for all requests to /api/profiles


// app.post('/', async (req, res) => {
//   const profile = req.body; //user will send the profile data in the body of the request

//   if(!profile.name || !profile.email) {
//     return res.status(400).json({ success:false,  message: 'Name and email are required' });
//     // return res.status(400).json({ message: 'Profile data is required' });
//   }


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
