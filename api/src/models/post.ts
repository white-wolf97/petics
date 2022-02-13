import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	imgUrl: {
		type: String,
		required: true,
		unique: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	likedBy: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

export default model('Post', PostSchema);
