import express from 'express';
import PostController from '../../../../controllers/postController';

const postController = new PostController();

const router = express.Router();

router.get('/post/:id', postController.getPostById);

router.get('/post/:userid', express.json(), postController.getPostsByUserId);

router.post('/post', express.json(), postController.createNewPost);

export default router;
