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
export interface ChatDocument extends ChatType, Document {
}
declare const Chat: mongoose.Model<ChatDocument, {}, {}, {}, mongoose.Document<unknown, {}, ChatDocument, {}, {}> & ChatDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Chat;
//# sourceMappingURL=Chat.model.d.ts.map