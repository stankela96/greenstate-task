import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../../package.json';

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Greenstate Backend Task',
			version,
			description: 'API docs',
			contact: {
				name: 'Stefan Stankovic',
				email: 'stankovicstefan87@gmail.com'
			}
		},
		servers: [
			{
				url: 'http://localhost:3000/api'
			}
		]
	},
	apis: ['./src/dto/*.ts', './src/**/*request.ts', './src/**/*controller.ts', './src/**/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
