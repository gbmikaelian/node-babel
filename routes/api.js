import { Router } from 'express';
import { UserController } from '../controllers';

const router = new Router();

router.get('/me', UserController.me);

export default router;