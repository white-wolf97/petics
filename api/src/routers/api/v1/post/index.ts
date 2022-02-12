import express from 'express';
import {
	getPostById,
	createNewPost,
	getPostsByUserId
} from '../../../../controllers/postController';

const router = express.Router();

router.get('/post/:id', getPostById);

router.get('/post/:userid', express.json(), getPostsByUserId);

router.post('/post', express.json(), createNewPost);

export default router;
