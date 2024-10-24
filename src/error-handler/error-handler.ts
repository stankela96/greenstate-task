class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ConflictError extends HttpError {
	constructor(message = 'Conflict') {
		super(message, 409);
	}
}

export class NotFoundError extends HttpError {
	constructor(message = 'Not Found') {
		super(message, 404);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message = 'Unauthorized') {
		super(message, 401);
	}
}
