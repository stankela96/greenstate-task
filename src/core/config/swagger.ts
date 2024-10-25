import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../../package.json';

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Your API Title',
			version,
			description: 'API documentation for your Express + TypeScript application',
			contact: {
				name: 'Your Name',
				email: 'your-email@example.com'
			}
		},
		servers: [
			{
				url: 'http://localhost:3000/api'
			}
		]
	},
	apis: ['./src/dto/*.ts', './src/**/*request.ts', './src/**/*controller.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
