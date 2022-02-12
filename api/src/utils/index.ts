import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';

export const hash = (data: string) => {
	const sha256gen = crypto.createHmac('sha256', config.passwordSalt);
	const result = sha256gen.update(data).digest('hex');
	return result;
};

export const generateAccessToken = (email: string) => {
	return jwt.sign({ email }, config.tokenSecret, { expiresIn: '1y' });
};
