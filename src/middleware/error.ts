import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../error-handler/error-handler';

export const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err);
	res.status(err.statusCode).send({ message: err.message });
};
