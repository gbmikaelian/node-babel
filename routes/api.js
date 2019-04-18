import { Router } from 'express';
import { UserController } from '../controllers';

const userController = new UserController();
const router = new Router();

router.get('/me', userController.me);

export default router;