import { Request, Response } from 'express';

export const getPostById = (req: Request, res: Response) => {
	/* get post information (author, date, photos) */
	const postId = req.params.id;
	res.send({
		id: postId
	});
};

export const getPostsByUserId = (req: Request, res: Response) => {};

export const createNewPost = (req: Request, res: Response) => {
	res.json({ ok: true });
};

export const getFavoritesPostsByUserId = (req: Request, res: Response) => {
	res.send('ok');
};
