import Chat, {} from '../models/Chat.model.js';
const createChat = async (req, res) => {
    try {
        const userId = req.user?._id?.toString();
        const userName = req.user?.name;
        if (userId && userName) {
            const chatData = {
                userId,
                userName,
                messages: [],
                chatName: "New Chat",
            };
            await Chat.create(chatData);
            res.json({ success: true, message: "Chat created" });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid request" });
        }
    }
    catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
    }
};
const getChats = async (req, res) => {
    try {
        const userId = req.user?._id?.toString();
        if (userId) {
            const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
            res.json({ success: true, chats });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid request" });
        }
    }
    catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
    }
};
const deleteChat = async (req, res) => {
    try {
        const userId = req.user?._id?.toString();
        const chatId = req.params.chatId;
        if (userId && chatId) {
            await Chat.deleteOne({ _id: chatId, userId });
            res.json({ success: true, message: "Chat deleted" });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid request" });
        }
    }
    catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
    }
};
export default { createChat, getChats, deleteChat };
//# sourceMappingURL=chat.controller.js.map