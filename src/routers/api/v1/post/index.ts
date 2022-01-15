import express from 'express';

const router = express.Router();

router.get('/post/:id', (req, res) => {
	/* send post information (author, date, photos) */
	const postId = req.params.id;
	res.send({
		id: postId
	});
});

router.post('/post', express.json(), (req, res) => {
	/* create a new post */
});

export default router;
