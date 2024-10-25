import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.request';
import { CustomRequest } from '../middleware/types';
import { Task, TaskPriority } from '@prisma/client';
import { OneTaskDto } from './dto/task.response';

export class TaskController {
	private readonly taskService = new TaskService();

	/**
	 * @swagger
	 * /tasks:
	 *   post:
	 *     summary: Create a new task
	 *     tags: [Tasks]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/CreateTaskDto'
	 *     responses:
	 *       201:
	 *         description: Task created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/OneTaskDto'
	 *       400:
	 *         description: Validation error
	 */
	async create(req: Request, res: Response): Promise<OneTaskDto> {
		const taskDto: CreateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;

		const task = await this.taskService.create(taskDto, userId);
		res.status(201).send(task);

		return task;
	}

	/**
	 * @swagger
	 * /tasks:
	 *   get:
	 *     summary: Get all tasks
	 *     tags: [Tasks]
	 *     parameters:
	 *       - in: query
	 *         name: priority
	 *         required: false
	 *         description: Filter tasks by priority
	 *         schema:
	 *           type: string
	 *           enum: [LOW, MEDIUM, HIGH]
	 *     responses:
	 *       200:
	 *         description: A list of tasks
	 */
	async getAll(req: Request, res: Response): Promise<OneTaskDto[]> {
		const userId = (req as CustomRequest).userId;
		const priority = req.query.priority as TaskPriority | undefined;

		const tasks = await this.taskService.getAll(userId, priority);
		res.status(200).send(tasks);

		return tasks;
	}

	/**
	 * @swagger
	 * /tasks/{id}:
	 *   get:
	 *     summary: Get task by ID
	 *     tags: [Tasks]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID of the task to retrieve
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Task retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Task'
	 *       404:
	 *         description: Task not found
	 */
	async getById(req: Request, res: Response): Promise<OneTaskDto | void> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		try {
			const task = await this.taskService.getById(id, userId);
			res.status(200).send(task);

			return task;
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).send({ message: error.message });
			}
		}

		return;
	}

	/**
	 * @swagger
	 * /tasks/{id}:
	 *   put:
	 *     summary: Update task by ID
	 *     tags: [Tasks]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID of the task to update
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/UpdateTaskDto'
	 *     responses:
	 *       200:
	 *         description: Task updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Task'
	 *       400:
	 *         description: Validation error
	 *       404:
	 *         description: Task not found
	 */
	async update(req: Request, res: Response): Promise<OneTaskDto> {
		const { id } = req.params;
		const updateDto: UpdateTaskDto = req.body;
		const userId = (req as CustomRequest).userId;

		const updatedTask = await this.taskService.update(id, updateDto, userId);
		res.status(200).send(updatedTask);

		return updatedTask;
	}

	/**
	 * @swagger
	 * /tasks/{id}:
	 *   delete:
	 *     summary: Delete task by ID
	 *     tags: [Tasks]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID of the task to delete
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Task deleted successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Task'
	 *       404:
	 *         description: Task not found
	 */
	async delete(req: Request, res: Response): Promise<OneTaskDto> {
		const { id } = req.params;
		const userId = (req as CustomRequest).userId;

		const deletedTask = await this.taskService.delete(id, userId);
		res.status(200).send(deletedTask);

		return deletedTask;
	}

	/**
	 * @swagger
	 * components:
	 *   securitySchemes:
	 *     BearerAuth:
	 *       type: http
	 *       scheme: bearer
	 *       bearerFormat: JWT
	 *   schemas:
	 *     Task:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: string
	 *           format: uuid
	 *         createdAt:
	 *           type: string
	 *           format: date-time
	 *         updatedAt:
	 *           type: string
	 *           format: date-time
	 *         title:
	 *           type: string
	 *         description:
	 *           type: string
	 *         priority:
	 *           type: enum
	 *           enum: [LOW, MEDIUM, HIGH]
	 *         status:
	 *           type: enum
	 *           enum: [IN_PROGRESS, DONE]
	 *     CreateTaskDto:
	 *       type: object
	 *       required:
	 *         - title
	 *         - description
	 *         - priority
	 *       properties:
	 *         title:
	 *           type: string
	 *         description:
	 *           type: string
	 *         priority:
	 *           type: string
	 *           enum: [LOW, MEDIUM, HIGH]
	 *     UpdateTaskDto:
	 *       type: object
	 *       properties:
	 *         title:
	 *           type: string
	 *         description:
	 *           type: string
	 *         priority:
	 *           type: string
	 *           enum: [LOW, MEDIUM, HIGH]
	 *         status:
	 *           type: string
	 *           enum: [IN_PROGRESS, DONE]
	 *     OneTaskDto:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: string
	 *           format: uuid
	 *         createdAt:
	 *           type: string
	 *           format: date-time
	 *         updatedAt:
	 *           type: string
	 *           format: date-time
	 *         title:
	 *           type: string
	 *         description:
	 *           type: string
	 *         priority:
	 *           type: enum
	 *           enum: [LOW, MEDIUM, HIGH]
	 *         status:
	 *           type: enum
	 *           enum: [IN_PROGRESS, DONE]
	 *         userId:
	 *           type: string
	 *           format: uuid
	 */
}
