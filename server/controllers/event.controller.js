import mongoose from "mongoose";
import Event from "../models/event.model.js";

export const createEvent = async (req, res) => {
  const event = req.body; //user will send the event data in the body of the request

  if (!event.name || !event.about || !event.date || !event.time || !event.venue) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newEvent = new Event(event); //create a new event object using the Event model

  try {
    await newEvent.save(); //save the event to the database
    res.status(201).json({ success: true, message: "Event created successfully", data: newEvent });
  } catch (error) {
    console.error("Error in Create Event", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const events = await Event.find(); //find all events in the database
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error in Get Event", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params; //get the id from the request parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid event ID" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id); //find the event by ID and delete it
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted successfully", data: deletedEvent });
  } catch (error) {
    console.error("Error in Delete Event", error.message); //log the error message to the console
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
