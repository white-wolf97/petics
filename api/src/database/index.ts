import mongoose from 'mongoose';
import config from '../config';

const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(config.dbCnn);
		console.log('connected to db succesfully');
	} catch (err) {
		console.error("couldn't connect to db");
		process.exit(1);
	}
};

export default {
	connect
};
