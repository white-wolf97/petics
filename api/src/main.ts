import express from 'express';
import helmet from 'helmet';
import config from './config';
import apiv1 from './routers/api/v1';
import db from './database';

const app = express();

const main = async () => {
	app.use(helmet());
	app.use('/api/v1', apiv1);

	await db.connect();

	app.listen(config.port, () => {
		console.log(`server started succesfully`);
		console.log(`server is running on http://localhost:${config.port}`);
	});
};

main();
