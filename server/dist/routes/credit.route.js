import express, { Router } from 'express';
import creditController from '../controllers/credit.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const creditRouter = express.Router();
creditRouter.get("/plan", creditController.getPlans);
creditRouter.post("/purchase", protect, creditController.purchasePlan);
export default creditRouter;
//# sourceMappingURL=credit.route.js.map