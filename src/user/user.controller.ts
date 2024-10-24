import { Request, Response } from 'express';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.request';
import { OneUserDto } from './dto/user.response';

export class UserController {
	private readonly userService = new UserService();

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

	async login(req: Request, res: Response): Promise<string | void> {
		const authDto: LoginUserDto = req.body;

		try {
			const token = await this.userService.authenticate(authDto);

			res.send({ token });

			return token;
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).send({ message: error.message });
			}
		}

		return;
	}
}
