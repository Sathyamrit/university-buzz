import mongoose from "mongoose";
import Event from "../models/event.model.js";

export const createEvent = async (req, res) => {
  const { name, about, date, time, venue, clubId } = req.body;

  if (!name || !about || !date || !time || !venue || !clubId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newEvent = new Event({ name, about, date, time, venue, clubId });
    await newEvent.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getEventsByClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const events = await Event.find({ clubId });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    // Populate the clubId field with the club's name
    const events = await Event.find().populate("clubId", "name");
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching all events:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid event ID" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};