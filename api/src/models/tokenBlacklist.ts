import { Schema, model } from 'mongoose';

const TokenBlacklistSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	}
});

export default model('TokenBlacklist', TokenBlacklistSchema);
