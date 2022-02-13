import express from 'express';
import { check } from 'express-validator';
import validateFields from '../../../../middleware/validateFields';
import {
	getPostById,
	createNewPost,
	togglePostLike,
	getLikedPostsByUserId,
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

router.get(
	'/post/liked/:userId',
	[
		check('userId', 'Please enter a valid userId').trim().not().isEmpty(),
		validateFields,
		authenticateToken
	],
	getLikedPostsByUserId
);

router.post(
	'/post',
	[
		express.json(),
		check('imgUrl', 'Please enter an image url').trim().not().isEmpty(),
		validateFields,
		authenticateToken
	],
	createNewPost
);

router.post('/post/like', [express.json(), authenticateToken], togglePostLike);

export default router;
