import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import profileRoutes from "./routes/profile.route.js"; //import the profile routes
import postRoutes from "./routes/post.route.js"; //import the post routes
import eventRoutes from "./routes/event.route.js"; //import the event routes
import clubRoutes from "./routes/club.route.js"; //import the club routes

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://university-buzz.vercel.app", // Vercel frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from allowed origins or no origin (e.g., server-to-server requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(express.json()); //middleware to parse JSON data from incoming requests

app.use(express.static("public"));

app.use("/api/profiles", profileRoutes); //use the profileRoutes for all requests to /api/profiles
app.use("/api/posts", postRoutes); //use the postRoutes for all requests to /api/posts
app.use("/api/events", eventRoutes); //use the eventRoutes for all requests to /api/events
app.use("/api/clubs", clubRoutes); // Register club routes

// app.post("/profile", (req, res) => {
//   res.send("profile is running");
// });

// app.get('/', (req, res) => {
//   res.send('API is running...'); //send a response when the root URL is accessed
// });

// Server static files from the "public" directory and frontend
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" }); //send the index.html file when the root URL is accessed
});

// Start server
const startServer = async () => {
  try {
    await connectDB(); //connect to the database
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
      console.log("click http://localhost:5000 to visit the server");
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();
