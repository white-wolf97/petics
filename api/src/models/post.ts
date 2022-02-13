import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imgUrl: {
		type: String,
		required: true,
		unique: true
	},
	posterUser: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

export default model('Post', PostSchema);
