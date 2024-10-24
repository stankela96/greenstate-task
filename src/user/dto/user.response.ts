import { IsDate, IsString } from 'class-validator';

export class OneUserDto {
	@IsString()
	id: string;

	@IsDate()
	createdAt: Date;

	@IsDate()
	updatedAt: Date;

	@IsString()
	email: string;
}
