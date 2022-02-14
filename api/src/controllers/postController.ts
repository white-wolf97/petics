import { unlink } from 'fs';
import { Request, Response } from 'express';
import { upload } from '../middleware/upload';
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

export const createNewPost = async (req: Request, res: Response) => {
	const email = (req as any).user.email;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(400).json({
			status: 'fail',
			data: {
				message: `There is not an user with email ${email} in the database`
			}
		});

		return;
	}

	upload.single('post_image')(req, res, async (err) => {
		if (err) {
			res.status(400).json({
				status: 'fail',
				data: {
					message: err.message
				}
			});

			return;
		}

		if (!req.file) {
			res.status(400).json({
				status: 'fail',
				data: {
					message: 'A photo is required to create a post'
				}
			});

			return;
		}

		if (!req.body.description) {
			res.status(400).json({
				status: 'fail',
				data: {
					message: 'A description is required to create a post'
				}
			});

			unlink(`public/uploads/${req.file.filename}`, (_) => {});

			return;
		}

		await new Post({
			description: req.body.description,
			imgUrl: req.file.filename,
			owner: user._id,
			likedBy: []
		}).save();

		res.status(201).json({
			status: 'success',
			data: {
				message: `Post successfully created!`
			}
		});
	});
};

export const togglePostLike = async (req: Request, res: Response) => {
	try {
		const userEmail = (req as any).user.email;
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
