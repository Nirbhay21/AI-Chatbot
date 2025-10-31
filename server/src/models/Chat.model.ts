import mongoose, { Document } from "mongoose";

interface Message {
  isImage: boolean;
  isPublished?: boolean;
  role: string;
  content: string;
  timeStamp: number;
}

export interface ChatType {
  userId: string;
  userName: string;
  chatName: string;
  messages: Message[];
}

export interface ChatDocument extends ChatType, Document { }

const chatSchema = new mongoose.Schema<ChatDocument>({
  userId: { type: String, ref: "User", required: true },
  userName: { type: String, required: true },
  chatName: { type: String, required: true },
  messages: {
    type: [
      {
        isImage: { type: Boolean, required: true },
        isPublished: { type: Boolean, default: false },
        role: { type: String, required: true },
        content: { type: String, required: true },
        timeStamp: { type: Number, required: true }
      }
    ],
    default: [],
  }
}, { timestamps: true });

const Chat = mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chat;