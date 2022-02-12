import express from 'express';
import helmet from 'helmet';
import config from './config';
import apiv1 from './routers/api/v1';
import { dbConnection } from './database/config';

const app = express();

app.use(helmet());
app.use('/api/v1', apiv1);

try {
	dbConnection();
} catch (err) {
	console.log('Error initializing database');
	if (err instanceof Error) {
		console.log(err.message);
		console.log(err.stack);
	}
}

app.listen(config.port, () => {
	console.log(`server running on port: ${config.port}`);
});
