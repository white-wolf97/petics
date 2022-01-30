import express from 'express';
import PostController from '../../../../controllers/postController';

const router = express.Router();

router.get('/post/user/:userid', PostController.getPostByUserId);

router.get('/post/:id', PostController.getPostById);

router.post('/post', express.json(), PostController.createNewPost);

export default router;
