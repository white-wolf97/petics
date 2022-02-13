import express from 'express';
import signUp from '../../../../controllers/userController';
import { check } from 'express-validator';
import validateFields from '../../../../middleware/validateFields';

const router = express.Router();

router.post(
	'/user/signup',
	[
		express.json(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password').trim().not().isEmpty(),
		check('firstName', 'Please enter your firstname')
			.trim()
			.not()
			.isEmpty(),
		check('lastName', 'Please enter your lastname').trim().not().isEmpty(),
		validateFields
	],
	signUp
);

export default router;
