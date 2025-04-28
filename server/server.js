import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import profileRoutes from "./routes/profile.route.js"; //import the profile routes

dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse JSON data from incoming requests

app.use(express.static('public')); 

app.use("/api/profiles", profileRoutes); //use the profileRoutes for all requests to /api/profiles

// app.post("/profile", (req, res) => {
//   res.send("profile is running");
// });

// app.get('/', (req, res) => {
//   res.send('API is running...'); //send a response when the root URL is accessed
// });

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "server/views" }); //send the index.html file when the root URL is accessed
});

const startServer = async () => {
  try {
    await connectDB(); //connect to the database
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
      console.log("click http://localhost:5000 to visit the server");
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();
