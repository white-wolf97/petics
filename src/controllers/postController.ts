export default class PostController {
	constructor() {}

	public getPostById = (req: any, res: any) => {
		/* get post information (author, date, photos) */
		const postId = req.params.id;
		res.send({
			id: postId
		});
	};

	public getPostsByUserId = (req: any, res: any) => {};

	public createNewPost = (req: any, res: any) => {};
}
