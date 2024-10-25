import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterUserDto, LoginUserDto } from './dto/user.request';
import { OneUserDto } from './dto/user.response';

export class UserService {
	private prisma = new PrismaClient();

	async create(userDto: RegisterUserDto): Promise<OneUserDto | void> {
		const { email, password, confirmPassword } = userDto;

		if (password !== confirmPassword) {
			throw new Error('Password and Confirm Password do not match.');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (user) {
			throw new Error('User with given email already exists.');
		}

		const newUser = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		});

		return {
			id: newUser.id,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
			email: newUser.email
		};
	}

	async authenticate(authDto: LoginUserDto): Promise<string | void> {
		const { email, password } = authDto;
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found.');
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			throw new Error('Invalid credentials.');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
			expiresIn: '1h'
		});

		return token;
	}
}