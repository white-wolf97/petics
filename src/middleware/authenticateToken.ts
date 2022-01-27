import config from '../config';
import DatabaseError from '../exceptions/databaseError';
import TokenBlacklist from '../models/tokenBlacklist';

var jwt = require('jsonwebtoken');

export default function authenticateToken(req: any, res: any, next: any) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: 'A token is required for authentication' });
	}

	try {
		if (TokenBlacklist.isInBlacklist(token)) {
			return res.status(401).json({ message: 'Invalid token provided' });
		} else {
			const decoded = jwt.verify(token, config.tokenSecret);
			req.user = decoded;
		}
	} catch (err) {
		if (err instanceof DatabaseError) {
			// console.log(err.message); //TODO: uncomment this
			// console.log(err.stack); //TODO: uncomment this
			return res.status(500).json({ message: 'Internal server error!' });
		} else {
			return res.status(401).json({ message: 'Invalid token provided' });
		}
	}
	next();
}
