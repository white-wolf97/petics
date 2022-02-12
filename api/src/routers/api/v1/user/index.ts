import express from 'express';
import signUp from '../../../../controllers/userController';

const router = express.Router();

router.post('/user/signup', express.json(), signUp);

export default router;
