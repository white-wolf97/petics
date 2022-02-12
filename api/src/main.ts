import express from 'express';
import helmet from 'helmet';
import config from './config';
import apiv1 from './routers/api/v1';

const app = express();

app.use(helmet());
app.use('/api/v1', apiv1);

app.listen(config.port, () => {
	console.log(`server running on port: ${config.port}`);
});
