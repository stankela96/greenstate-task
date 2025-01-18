import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import routes from './routes/routes';
import { swaggerSpec } from '././core/config/swagger';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error';

import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';

interface ServerOptions {
	port: number;
	apiPrefix?: string;
}

export class Server {
	private readonly app = express();
	private readonly port: number;

	constructor(options: ServerOptions) {
		const { port } = options;
		this.port = port;
	}

	async start(): Promise<void> {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(compression());
		this.app.use('/api', routes);

		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);

		this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		this.app.use(errorHandler);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
			console.log(`\nSwagger docs available at http://localhost:${this.port}/api/docs`);
		});
	}
}
