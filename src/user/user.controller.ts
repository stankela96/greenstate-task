import { Request, Response } from 'express';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.request';
import { OneUserDto } from './dto/user.response';

export class UserController {
	private readonly userService = new UserService();

	/**
	 * @swagger
	 * /users/register:
	 *   post:
	 *     summary: Register a new user
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/RegisterUserDto'
	 *     responses:
	 *       201:
	 *         description: User registered successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/OneUserDto'
	 *       409:
	 *         description: Conflict - User already exists
	 *       400:
	 *         description: Validation error
	 */
	async register(req: Request, res: Response): Promise<OneUserDto | void> {
		const userDto: RegisterUserDto = req.body;

		try {
			const user = await this.userService.create(userDto);

			res.status(201).send(user);

			return user;
		} catch (error) {
			if (error instanceof Error) {
				res.status(409).send({ message: error.message });
			}
		}

		return;
	}

	/**
	 * @swagger
	 * /users/login:
	 *   post:
	 *     summary: Login a user
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/LoginUserDto'
	 *     responses:
	 *       200:
	 *         description: User authenticated successfully, returns a token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 token:
	 *                   type: string
	 *                   description: Authentication token
	 *       400:
	 *         description: Authentication failed - Invalid credentials
	 */
	async login(req: Request, res: Response): Promise<string | void> {
		const authDto: LoginUserDto = req.body;

		try {
			const token = await this.userService.authenticate(authDto);

			res.status(200).send({ token });

			return token;
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).send({ message: error.message });
			}
		}

		return;
	}

	/**
	 * @swagger
	 * components:
	 *   securitySchemes:
	 *     BearerAuth:
	 *       type: http
	 *       scheme: bearer
	 *       bearerFormat: JWT
	 *   schemas:
	 *     User:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: string
	 *           format: uuid
	 *         createdAt:
	 *           type: string
	 *           format: date-time
	 *         updatedAt:
	 *           type: string
	 *           format: date-time
	 *         email:
	 *           type: string
	 *           format: email
	 *         password:
	 *           type: string
	 *           format: password
	 *     RegisterUserDto:
	 *       type: object
	 *       required:
	 *         - email
	 *         - password
	 *         - confirmPassword
	 *       properties:
	 *         email:
	 *           type: string
	 *           format: email
	 *         password:
	 *           type: string
	 *           format: password
	 *         confirmPassword:
	 *           type: string
	 *           format: password
	 *     LoginUserDto:
	 *       type: object
	 *       required:
	 *         - email
	 *         - password
	 *       properties:
	 *         email:
	 *           type: string
	 *           format: email
	 *         password:
	 *           type: string
	 *           format: password
	 *     OneUserDto:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: string
	 *           format: uuid
	 *         createdAt:
	 *           type: string
	 *           format: date-time
	 *         updatedAt:
	 *           type: string
	 *           format: date-time
	 *         email:
	 *           type: string
	 *           format: email
	 */
}
