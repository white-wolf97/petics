import dotenv from 'dotenv';

dotenv.config();

interface PeticsConfiguration {
	port: number;
	tokenSecret: string;
	dbCnn: string;
	passwordSalt: string;
}

const config: PeticsConfiguration = {
	port: (process.env.PORT && parseInt(process.env.PORT)) || 8080,
	tokenSecret: process.env.TOKEN_SECRET || '',
	dbCnn: process.env.DB_CNN || '',
	passwordSalt: process.env.PASSWORD_SALT || ''
};

export default config;
