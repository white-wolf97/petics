import { Request } from 'express';

export interface RequestWithUser extends Request {
	[key: string]: any;
}
