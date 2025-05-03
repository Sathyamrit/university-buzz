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
  "https://university-buzz-production.up.railway.app", // Railway backend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json()); //middleware to parse JSON data from incoming requests

app.use(express.static("public"));

app.use("/api/profiles", profileRoutes); //use the profileRoutes for all requests to /api/profiles
app.use("/api/posts", postRoutes); //use the postRoutes for all requests to /api/posts
app.use("/api/events", eventRoutes); //use the eventRoutes for all requests to /api/events
app.use("/api/clubs", clubRoutes); // Register club routes

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" }); //send the index.html file when the root URL is accessed
});

// Start server
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await connectDB(); //connect to the database
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Visit http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();

