import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = (authHeader && authHeader.startsWith('Bearer '))
    ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const userId = (decoded as { id: string }).id;
      const user = await User.findById(userId);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
}