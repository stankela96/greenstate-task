import { NextFunction, Request, Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.request';
import { CustomRequest } from '../middleware/types';
import { TaskPriority } from '@prisma/client';
import { OneTaskDto } from './dto/task.response';

export class TaskController {
	private readonly taskService = new TaskService();

	async create(req: Request, res: Response): Promise<OneTaskDto> {
		const taskDto: CreateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;
		const task = await this.taskService.create(taskDto, userId);

		res.status(201).send(task);
		return task;
	}

	async getAll(req: Request, res: Response): Promise<OneTaskDto[]> {
		const userId = (req as CustomRequest).userId;
		const priority = req.query.priority as TaskPriority | undefined;
		const tasks = await this.taskService.getAll(userId, priority);

		res.status(200).send(tasks);
		return tasks;
	}

	async getById(req: Request, res: Response, next: NextFunction): Promise<OneTaskDto | undefined> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		try {
			const task = await this.taskService.getById(id, userId);

			res.status(200).send(task);
			return task;
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<OneTaskDto | undefined> {
		const { id } = req.params;
		const updateDto: UpdateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;

		try {
			const updatedTask = await this.taskService.update(id, updateDto, userId);

			res.status(200).send(updatedTask);
			return updatedTask;
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<OneTaskDto | undefined> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		try {
			const deletedTask = await this.taskService.delete(id, userId);

			res.status(200).send(deletedTask);
			return deletedTask;
		} catch (error) {
			next(error);
		}
	}
}
