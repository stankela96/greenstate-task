import { PrismaClient, Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.request';

export class TaskService {
	private prisma = new PrismaClient();

	async create(taskDto: CreateTaskDto, userId: string): Promise<Task> {
		return this.prisma.task.create({
			data: {
				...taskDto,
				userId
			}
		});
	}

	async getAll(userId: string): Promise<Task[]> {
		return this.prisma.task.findMany({
			where: { userId }
		});
	}

	async getById(id: string, userId: string): Promise<Task> {
		const task = await this.prisma.task.findUnique({ where: { id, userId } });

		if (!task) {
			throw new Error('Task not found');
		}

		return task;
	}

	async update(id: string, updateDto: UpdateTaskDto, userId: string): Promise<Task> {
		return this.prisma.task.update({
			where: { id, userId },
			data: updateDto
		});
	}

	async delete(id: string, userId: string): Promise<Task> {
		return this.prisma.task.delete({ where: { id, userId } });
	}
}
