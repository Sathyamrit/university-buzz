import express from 'express';

import { createEvent, getEvent, deleteEvent } from '../controllers/event.controller.js'; //import the createProfile function from the profile controller

const router = express.Router(); //create a new router object using the express.Router() method

router.post('/', createEvent); //use the createProfile function for all requests to /api/profiles

router.get('/', getEvent); //use the createProfile function for all requests to /api/profiles

router.delete('/:id', deleteEvent); //use the createProfile function for all requests to /api/profiles

export default router; //export the router object so it can be used in other files