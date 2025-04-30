import express from 'express';
import { createPost, getPost, deletePost, getPostsByClub } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/', createPost); // Create a post
router.get('/', getPost); // Get all posts or posts by email
router.get('/club/:clubId', getPostsByClub); // Get posts by club
router.delete('/:id', deletePost); // Delete a post by ID

export default router;