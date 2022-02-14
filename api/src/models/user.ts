import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	likedPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	]
});

export default model('User', UserSchema);
