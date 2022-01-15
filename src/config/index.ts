import dotenv from 'dotenv';

dotenv.config();

interface PeticsConfiguration {
	port: number;
}

const config: PeticsConfiguration = {
	port: (process.env.PORT && parseInt(process.env.PORT)) || 8080
};

export default config;
