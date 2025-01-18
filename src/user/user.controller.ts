import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto } from './dto/user.request';
import { OneUserDto } from './dto/user.response';

export class UserController {
	private readonly userService = new UserService();

	async register(req: Request, res: Response, next: NextFunction): Promise<OneUserDto | undefined> {
		const userDto: RegisterUserDto = req.body;

		try {
			const user = await this.userService.create(userDto);

			res.status(201).send(user);
			return user;
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<string | undefined> {
		const authDto: LoginUserDto = req.body;

		try {
			const token = await this.userService.authenticate(authDto);

			res.status(200).send({ token });
			return token;
		} catch (error) {
			next(error);
		}
	}
}
