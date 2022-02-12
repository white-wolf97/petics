import mongoose from 'mongoose';
import config from '../config';

export const dbConnection = async () => {
	try {
		await mongoose.connect(config.dbCnn);

		console.log('Conexión con Mongo Atlas exitosa');
	} catch (err) {
		console.log(err);
		throw new Error('Error al inicializar base de datos');
	}
};
