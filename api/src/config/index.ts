import dotenv from 'dotenv';

dotenv.config();

interface PeticsConfiguration {
	port: number;
	tokenSecret: string;
	dbCnn: string;
	passwordSalt: string;
	maxFileSize: number;
	minFileSize: number;
	supportedFileFormats: string[];
}

const config: PeticsConfiguration = {
	port: (process.env.PORT && parseInt(process.env.PORT)) || 8080,
	tokenSecret: process.env.TOKEN_SECRET || '',
	dbCnn: process.env.DB_CNN || '',
	passwordSalt: process.env.PASSWORD_SALT || '',
	maxFileSize: 1024 * 1024 * 3, // 3mb
	minFileSize: 1024 * 20, // 20kb
	supportedFileFormats: ['jpeg', 'jpg', 'png']
};

export default config;
