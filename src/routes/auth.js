import { Router } from 'express';
import AuthController from 'src/controllers/AuthController';

const router = new Router();
const authController = new AuthController();

router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);

export default router;