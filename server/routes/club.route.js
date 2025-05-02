import express from "express";
import {
  getClubs,
  createClub,
  loginClub,
  updateClub, // Import the updateClub controller
} from "../controllers/club.controller.js";
import Club from "../models/club.model.js";

const router = express.Router();

router.get("/", getClubs); // Route to fetch all clubs
router.post("/", createClub); // Route to create a club
router.post("/login", loginClub); // Route to login as a club
router.put("/:id", updateClub); // Route to update a club by ID

// Get a club by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, data: club });
  } catch (error) {
    console.error("Error fetching club:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
