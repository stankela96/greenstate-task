import { HttpCode } from '../core/constants';

export class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends HttpError {
	constructor(message = 'Not Found.') {
		super(message, HttpCode.NOT_FOUND);
	}
}

export class BadRequestError extends HttpError {
	constructor(message = 'Bad Request.') {
		super(message, HttpCode.BAD_REQUEST);
	}
}
