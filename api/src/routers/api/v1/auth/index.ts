import express from 'express';
import { login, logout } from '../../../../controllers/authController';
import { authenticateToken } from '../../../../middleware/authenticateToken';
import validateFields from '../../../../middleware/validateFields';
import { check } from 'express-validator';

const router = express.Router();

router.post(
	'/auth/login',
	[
		express.json(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password').trim().not().isEmpty(),
		validateFields
	],
	login
);

router.post('/auth/logout', [express.json(), authenticateToken], logout);

export default router;
