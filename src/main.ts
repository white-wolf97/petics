import express from 'express';

const port = 8080;
const app = express();

app.get('*', (req, res, next) => {
	res.send('hi');
});

app.listen(port, () => {
	console.log(`server running on port :${port}`);
});
