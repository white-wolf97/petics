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
