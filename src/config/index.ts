import dotenv from 'dotenv';

dotenv.config();

interface PeticsConfiguration {
	port: number;
	tokenSecret: string;
}

const config: PeticsConfiguration = {
	port: (process.env.PORT && parseInt(process.env.PORT)) || 8080;
	tokenSecret: (process.env.TOKEN_SECRET) || ''
};

export default config;
