import { PrismaClient, Task, TaskPriority } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.request';
import { OneTaskDto } from './dto/task.response';

export class TaskService {
	private prisma = new PrismaClient();

	async create(taskDto: CreateTaskDto, userId: string): Promise<OneTaskDto> {
		return this.prisma.task.create({
			data: {
				...taskDto,
				userId
			}
		});
	}

	async getAll(userId: string, priority?: TaskPriority): Promise<OneTaskDto[]> {
		return this.prisma.task.findMany({
			where: {
				userId,
				...(priority && { priority })
			}
		});
	}

	async getById(id: string, userId: string): Promise<OneTaskDto> {
		return this.checkTaskExistence(id, userId);
	}

	async update(id: string, updateDto: UpdateTaskDto, userId: string): Promise<OneTaskDto> {
		await this.checkTaskExistence(id, userId);

		return this.prisma.task.update({
			where: { id, userId },
			data: updateDto
		});
	}

	async delete(id: string, userId: string): Promise<OneTaskDto> {
		await this.checkTaskExistence(id, userId);
		return this.prisma.task.delete({ where: { id, userId } });
	}

	private async checkTaskExistence(id: string, userId: string): Promise<OneTaskDto> {
		const task = await this.prisma.task.findUnique({ where: { id, userId } });

		if (!task) {
			throw new Error('Task not found.');
		}

		return task;
	}
}
