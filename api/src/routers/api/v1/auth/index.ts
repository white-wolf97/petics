import express from 'express';
import { login, logout } from '../../../../controllers/authController';
import { authenticateToken } from '../../../../middleware/authenticateToken';

const router = express.Router();

router.post('/auth/login', express.json(), login);

router.post('/auth/logout', [express.json(), authenticateToken], logout);

export default router;
