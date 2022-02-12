import User from '../models/user';
import { Request, Response } from 'express';
import { hash, generateAccessToken } from '../utils';

const signUp = async (req: Request, res: Response) => {
	try {
		const email = req.body.email.toLowerCase().trim();
		const firstName = req.body.firstName.trim();
		const lastName = req.body.lastName.trim();
		const password = req.body.password.trim();

		let user = await User.findOne({ email });
		if (user) {
			res.status(409).json({
				status: 'fail',
				data: {
					message: `There is already an user with the email ${email}`
				}
			});
		} else {
			user = new User({
				firstName,
				lastName,
				email,
				password: hash(password)
			});
			await user.save();
			const token = generateAccessToken(email);
			res.status(201).json({
				status: 'success',
				data: { message: 'Successfully signed up!', token }
			});
		}
	} catch (err) {
		res.status(500).json({
			status: 'error',
			data: { message: 'An unexpected error occurred!' }
		});
		if (err instanceof Error) {
			console.log(err.message);
		}
	}
};

export default signUp;
