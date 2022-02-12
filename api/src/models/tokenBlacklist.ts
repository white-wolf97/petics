import fs from 'fs';
import path from 'path';
import DatabaseError from '../exceptions/databaseError';

export default class TokenBlacklist {
	public static getBlacklist() {
		try {
			const blacklistBeforeParsing = fs.readFileSync(
				path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'),
				'utf8'
			);
			if (blacklistBeforeParsing)
				return JSON.parse(blacklistBeforeParsing);
			else return [];
		} catch (err) {
			throw new DatabaseError('Problem accessing the database!');
		}
	}

	public static saveToDB(blacklist: any) {
		try {
			fs.writeFileSync(
				path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'),
				JSON.stringify(blacklist),
				'utf8'
			);
		} catch (err) {
			throw new DatabaseError('Problem accessing the database!');
		}
	}

	public static isInBlacklist(token: string) {
		try {
			const blacklist = TokenBlacklist.getBlacklist();
			return blacklist.includes(token);
		} catch (err) {
			throw new DatabaseError('Problem accessing the database!');
		}
	}
}
