import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Request, Response } from "express";

import connectDB from "./configs/db.config.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import apiKeyValidator from "./middlewares/apiKeyAuth.middleware.js";
import messageRouter from "./routes/message.route.js";
import creditRouter from "./routes/credit.route.js";
import { stripeWebhooks } from "./controllers/webhooks.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(apiKeyValidator);
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});