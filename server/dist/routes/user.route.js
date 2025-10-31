import express, { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const userRouter = express.Router();
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/data', protect, userController.getUser);
userRouter.get('/published-images', protect, userController.getPublishedImages);
export default userRouter;
//# sourceMappingURL=user.route.js.map