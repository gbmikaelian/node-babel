import { Router } from 'express';
import UserController from 'src/controllers/UserController';

const userController = new UserController();
const router = new Router();

router.get('/me', userController.me);

export default router;
