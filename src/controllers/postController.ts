export default class PostController {
	public static getPostById(req: any, res: any): void {
		/* get post information (author, date, photos) */
		const postId = req.params.id;
		res.send({
			id: postId
		});
	}

	public static createNewPost(req: any, res: any): void {}
	public static getPostByUserId(req: any, res: any): void {}
}
