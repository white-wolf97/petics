import express from 'express';
import {
	getPostById,
	createNewPost,
	getPostsByUserId
} from '../../../../controllers/postController';
import { authenticateToken } from '../../../../middleware/authenticateToken';

const router = express.Router();

router.get('/post/:id', authenticateToken, getPostById);

router.get(
	'/post/:userid',
	[express.json(), authenticateToken],
	getPostsByUserId
);

router.post('/post', authenticateToken, createNewPost);

export default router;
