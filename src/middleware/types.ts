import { Request } from 'express';

export interface CustomRequest extends Request {
	userId: string;
}

export interface JwtPayload {
	id: string;
}

export type ObjectLike = Record<string, any>;
