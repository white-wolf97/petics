import express from 'express';
import helmet from 'helmet';

const port = 8080;
const app = express();

app.use(helmet());

app.get('*', (req, res, next) => {
	res.send('hi');
});

app.listen(port, () => {
	console.log(`server running on port :${port}`);
});
