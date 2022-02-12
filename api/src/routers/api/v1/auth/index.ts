import express from 'express';
import { login, logout } from '../../../../controllers/authController';

const router = express.Router();

router.post('/auth/login', express.json(), login);

router.post('/auth/logout', express.json(), logout);

export default router;
