import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsString()
	confirmPassword: string;
}

export class LoginUserDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
