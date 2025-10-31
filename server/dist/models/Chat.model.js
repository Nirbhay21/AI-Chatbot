import mongoose, { Document } from "mongoose";
const chatSchema = new mongoose.Schema({
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
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
//# sourceMappingURL=Chat.model.js.map