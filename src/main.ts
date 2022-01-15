import express from 'express';
import helmet from 'helmet';
import config from './config';

const app = express();

app.use(helmet());

app.get('*', (req, res, next) => {
	res.send('hi');
});

app.listen(config.port, () => {
	console.log(`server running on port :${config.port}`);
});
