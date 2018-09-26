import { Router } from 'express';
import { AuthController } from '../controllers';

const router = new Router();

router.get('/sign-in', AuthController.signIn);
router.get('/sign-up', AuthController.signUp);

export default router;