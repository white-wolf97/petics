export const getPostById = (req: any, res: any) => {
	/* get post information (author, date, photos) */
	const postId = req.params.id;
	res.send({
		id: postId
	});
};

export const getPostsByUserId = (req: any, res: any) => {};

export const createNewPost = (req: any, res: any) => {};
