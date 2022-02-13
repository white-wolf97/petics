import { Request, Response } from 'express';
import { RequestWithUser } from '../common/requestWithUser';
import User from '../models/user';
import Post from '../models/post';

export const getPostById = (req: Request, res: Response) => {
	/* get post information (author, date, photos) */
	const postId = req.params.id;
	res.send({
		id: postId
	});
};

export const getPostsByUserId = (req: Request, res: Response) => {};

export const createNewPost = async (req: RequestWithUser, res: Response) => {
	try {
		const { description, imgUrl } = req.body;
		const email = req.user.email;
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({
				status: 'fail',
				data: {
					message: `There is not an user with email ${email} in the database`
				}
			});

		const post = new Post({
			description,
			imgUrl,
			owner: user._id,
			likedBy: []
		});
		await post.save();

		return res.status(201).json({
			status: 'success',
			data: {
				message: `Post successfully created!`
			}
		});
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message);
			console.log(err.stack);
		}
		return res.status(500).json({
			status: 'fail',
			data: {
				message: `Internal server error`
			}
		});
	}
};

export const togglePostLike = async (req: RequestWithUser, res: Response) => {
	try {
		const userEmail = req.user.email;
		const postId = req.body.postId;

		const user = await User.findOne({ email: userEmail });
		if (!user)
			return res.status(400).json({
				status: 'fail',
				data: {
					message: `There is not an user with email ${userEmail} in the database`
				}
			});

		const post = await Post.findById(postId);
		if (!post)
			return res.status(400).json({
				status: 'fail',
				data: {
					message: `There is not an post with id ${postId} in the database`
				}
			});

		if (user.likedPosts.includes(postId)) user.likedPosts.remove(postId);
		else user.likedPosts = [...user.likedPosts, postId];
		user.save();

		const userId = user._id;

		if (post.likedBy.includes(userId)) post.likedBy.remove(userId);
		else post.likedBy = [...post.likedBy, userId];

		post.save();
		return res.status(200).json({
			status: 'success',
			data: {
				message: `Ok`
			}
		});
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message);
			console.log(err.stack);
		}
		return res.status(500).json({
			status: 'fail',
			data: {
				message: `Internal server error`
			}
		});
	}
};

export const getLikedPostsByUserId = async (req: Request, res: Response) => {
	res.send('ok');
};
