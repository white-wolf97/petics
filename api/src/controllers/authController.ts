import { Request, Response } from 'express';
import User from '../models/user';
import { generateAccessToken, hash } from '../utils';
import TokenBlacklist from '../models/tokenBlacklist';

export const login = async (req: Request, res: Response) => {
	try {
		const email = req.body.email.toLowerCase().trim();
		const password = req.body.password.trim();

		const user = await User.findOne({ email });
		if (!user) {
			res.status(409).json({
				status: 'fail',
				data: {
					message: `There is not a registered user with the email ${email} in the database`
				}
			});
			return;
		}

		if (hash(password) === user.password) {
			const token = generateAccessToken(email);
			const { firstName, lastName } = user;
			res.json({
				status: 'success',
				data: { token: token, user: firstName + ' ' + lastName }
			});
		} else
			res.status(401).json({
				status: 'fail',
				data: { message: 'Wrong password!' }
			});
	} catch (exception) {
		res.status(500).json({
			status: 'error',
			data: { message: 'An unexpected error occurred!' }
		});
		console.log(exception);
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const newTokenInDb = new TokenBlacklist({ token });
		await newTokenInDb.save();
		res.json({ status: 'success', data: { message: 'Logged out!' } });
	} catch (err) {
		res.status(500).json({
			status: 'error',
			data: { message: 'An unexpected error occurred!' }
		});
		if (err instanceof Error) {
			console.log(err.message);
			console.log(err.stack);
		}
	}
};
