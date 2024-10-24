import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto<T extends object>(dtoClass: ClassConstructor<T>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const dtoInstance = plainToInstance(dtoClass, req.body);

		validate(dtoInstance).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
				return res.status(400).json({ message: messages.join(', ') });
			} else {
				next();
			}
		});
	};
}
