import express from 'express';
import postRouter from './post';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use(postRouter);
router.use(authRouter);
router.use(userRouter);

export default router;
