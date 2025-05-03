import express from "express";

import {
  createProfile,
  loginProfile,
  joinClub,
  getJoinedClubs,
} from "../controllers/profile.controller.js"; //import the createProfile function from the profile controller

const router = express.Router(); //create a new router object using the express.Router() method

router.post("/login", loginProfile); //use the loginProfile function for all requests to /api/profiles/login

router.post("/", createProfile); //use the createProfile function for all requests to /api/profiles

router.post("/join-club", joinClub); // Add a route to join a club

router.get("/:id/joined-clubs", getJoinedClubs); // Add a route to fetch joined clubs

export default router; //export the router object so it can be used in other files
