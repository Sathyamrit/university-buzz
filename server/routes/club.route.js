import express from 'express';
import { getClubs, createClub, loginClub } from '../controllers/club.controller.js';

const router = express.Router();

router.get('/', getClubs); // Route to fetch all clubs
router.post('/', createClub); // Route to create a club
router.post('/login', loginClub); // Route to login as a club

export default router;