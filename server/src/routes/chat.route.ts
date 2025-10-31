import express, { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import chatController from '../controllers/chat.controller.js';

const chatRouter: Router = express.Router();

chatRouter.get("/get", protect, chatController.getChats);
chatRouter.post("/create", protect, chatController.createChat);
chatRouter.delete("/delete/:chatId", protect, chatController.deleteChat);

export default chatRouter;