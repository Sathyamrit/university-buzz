import express from "express";
import {
  createEvent,
  getEventsByClub,
  getAllEvents,
  deleteEvent
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent); // Create an event
router.get("/", getAllEvents); // Get all events
router.get("/:clubId", getEventsByClub); // Get events by club
router.delete("/:id", deleteEvent); // Delete an event by ID

export default router;
