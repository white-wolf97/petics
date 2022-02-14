import config from '../config';
import { Response, Request } from 'express';
import TokenBlacklist from '../models/tokenBlacklist';
import * as jwt from 'jsonwebtoken';

export const authenticateToken = async (
	req: Request,
	res: Response,
	next: any
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			status: 'fail',
			data: { message: 'A token is required for authentication' }
		});
	}

	try {
		const tokenInBlacklist = await TokenBlacklist.findOne({ token });
		if (tokenInBlacklist) {
			return res.status(401).json({
				status: 'fail',
				data: { message: 'Invalid token provided' }
			});
		} else {
			const decoded = jwt.verify(token, config.tokenSecret);
			(req as any).user = decoded;
		}
	} catch (err) {
		return res.status(401).json({
			status: 'fail',
			data: { message: 'Invalid token provided' }
		});
	}
	return next();
};
