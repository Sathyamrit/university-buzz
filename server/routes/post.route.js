import express from 'express';

import { createPost, getPost, deletePost } from '../controllers/post.controller.js'; //import the createProfile function from the profile controller

const router = express.Router(); //create a new router object using the express.Router() method

router.post('/', createPost); //use the createProfile function for all requests to /api/profiles
router.get('/', getPost); //use the createProfile function for all requests to /api/profiles
router.delete('/:id', deletePost); //use the createProfile function for all requests to /api/profiles


export default router; //export the router object so it can be used in other files