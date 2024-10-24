import { Router } from 'express';
import { UserController } from '../user/user.controller';
import { TaskController } from '../task/task.controller';
import { authenticate } from '../middleware/auth';
import { validateDto } from '../middleware/validation';
import { RegisterUserDto } from '../user/dto/user.request';
import { CreateTaskDto, UpdateTaskDto } from '../task/dto/task.request';

const router = Router();
const userController = new UserController();
const taskController = new TaskController();

// User routes
router.post('/users/register', validateDto(RegisterUserDto), userController.register.bind(userController));
router.post('/users/login', userController.login.bind(userController));

// Task routes
router.post('/tasks', authenticate, validateDto(CreateTaskDto), taskController.create.bind(taskController));
router.get('/tasks/:id', authenticate, taskController.getById.bind(taskController));
router.get('/tasks', authenticate, taskController.getAll.bind(taskController));
router.put('/tasks/:id', authenticate, validateDto(UpdateTaskDto), taskController.update.bind(taskController));
router.delete('/tasks/:id', authenticate, taskController.delete.bind(taskController));

export default router;
