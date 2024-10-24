import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum($Enums.TaskPriority)
	priority: $Enums.TaskPriority;
}

export class UpdateTaskDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsEnum($Enums.TaskPriority)
	priority?: $Enums.TaskPriority;

	@IsOptional()
	@IsEnum($Enums.TaskStatus)
	status?: $Enums.TaskStatus;
}
