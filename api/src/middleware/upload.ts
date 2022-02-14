import config from '../config';
import { v4 as uuid } from 'uuid';
import multer, { diskStorage, FileFilterCallback } from 'multer';

interface FileNameCallback {
	(error: Error | null, destination: string): void;
}

export const upload = multer({
	storage: diskStorage({
		/* target directory */
		destination: 'public/uploads',
		/* filename generator format: random-uuid.extension */
		filename: (_, file: Express.Multer.File, cb: FileNameCallback) => {
			cb(null, uuid() + '.' + file.mimetype.split('/')[1]);
		}
	}),
	fileFilter: (_, file: Express.Multer.File, cb: FileFilterCallback) => {
		if (!config.supportedFileFormats.includes(file.mimetype.split('/')[1]))
			cb(new Error('File format is not supported'));
		else if (file.size > config.maxFileSize)
			cb(new Error('File is too big'));
		else if (file.size < config.minFileSize)
			cb(new Error('file is too small'));
		else cb(null, true);
	}
});
