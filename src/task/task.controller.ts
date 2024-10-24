import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.request';
import { CustomRequest } from '../middleware/types';
import { Task } from '@prisma/client';

export class TaskController {
	private readonly taskService = new TaskService();

	async create(req: Request, res: Response): Promise<Task> {
		const taskDto: CreateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;

		const task = await this.taskService.create(taskDto, userId);
		res.status(201).send(task);

		return task;
	}

	async getAll(req: Request, res: Response): Promise<Task[]> {
		const userId = (req as CustomRequest).userId;

		const tasks = await this.taskService.getAll(userId);
		res.send(tasks);

		return tasks;
	}

	async getById(req: Request, res: Response): Promise<Task | void> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		try {
			const task = await this.taskService.getById(id, userId);
			res.send(task);

			return task;
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).send({ message: error.message });
			}
		}

		return;
	}

	async update(req: Request, res: Response): Promise<Task> {
		const { id } = req.params;
		const updateDto: UpdateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;

		const updatedTask = await this.taskService.update(id, updateDto, userId);
		res.send(updatedTask);

		return updatedTask;
	}

	async delete(req: Request, res: Response): Promise<Task> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		const deletedTask = await this.taskService.delete(id, userId);
		res.send(deletedTask);

		return deletedTask;
	}
}
