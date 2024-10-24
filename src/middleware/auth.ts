import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, JwtPayload } from './types';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(401).send({ message: 'Authorization token is required.' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
		(req as CustomRequest).userId = decoded.id;
		next();
	} catch (err) {
		return res.status(403).send({ message: 'Invalid token.' });
	}
};
