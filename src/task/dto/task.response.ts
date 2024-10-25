import { $Enums } from '@prisma/client';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class OneTaskDto {
	@IsString()
	id: string;

	@IsDate()
	createdAt: Date;

	@IsDate()
	updatedAt: Date;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum($Enums.TaskPriority)
	priority: $Enums.TaskPriority;

	@IsEnum($Enums.TaskStatus)
	status: $Enums.TaskStatus;

	@IsString()
	userId: string;
}
