import type { Request, Response } from 'express';
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import Chat from '../models/Chat.model.js';

type ObjectId = mongoose.Types.ObjectId;

const generateToken = (id: ObjectId) => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  });
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    } else {
      const newUser = await User.create({ name, email, password });
      const token = generateToken(newUser._id);
      return res.status(201).json({ success: true, message: "User registered successfully", token });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("isMatch:", isMatch);
      if (isMatch) {
        const token = generateToken(user._id);
        return res.status(200).json({ success: true, message: "User logged in successfully", token });
      }
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
  }
}

const getPublishedImages = async (req: Request, res: Response) => {
  try {
    const publishedImageMessages = await Chat.aggregate([
      { $unwind: "$messages" },
      { $match: { "messages.isPublished": true, "messages.isImage": true } },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName",
        }
      }
    ]);
    res.json({ success: true, images: publishedImageMessages.reverse() });
  } catch (error) {
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
  }
}

export default { registerUser, loginUser, getUser, getPublishedImages };