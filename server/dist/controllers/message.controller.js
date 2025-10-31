import Chat from "../models/Chat.model.js";
import openai from "../configs/openai.config.js";
import User from "../models/User.model.js";
import axios from "axios";
import imagekit from "../configs/imagekit.config.js";
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user?._id?.toString();
        const { chatId, prompt } = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
        // Check user credits
        if (req.user?.credits && req.user.credits < 1) {
            return res.status(403).json({ success: false, message: "You don't have enough credits to use this feature" });
        }
        // If chat exists, process the message
        if (chat) {
            // Add user message to chat
            chat.messages.push({
                role: "user",
                content: prompt,
                timeStamp: Date.now(),
                isImage: false
            });
            // Call OpenAI API to get response
            const response = await openai.chat.completions.create({
                model: "gemini-2.0-flash",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: prompt
                    },
                ],
            });
            // Extract AI response, save to chat, and respond to client
            const aiResponse = response?.choices[0]?.message.content || "Sorry, I couldn't generate a response.";
            const reply = {
                role: "assistant",
                timeStamp: Date.now(),
                content: aiResponse,
                isImage: false
            };
            res.json({ success: true, message: "Message processed", reply });
            chat.messages.push(reply);
            await chat.save();
            await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
        }
        else {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
    }
    catch (error) {
        console.error("Error processing text message:", error);
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
    }
};
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user?._id?.toString();
        const { prompt, chatId, isPublished } = req.body;
        // Check user credits
        if (req.user?.credits && req.user.credits < 2) {
            return res.status(403).json({ success: false, message: "You don't have enough credits to use this feature" });
        }
        // If chat exists, process the message
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (chat) {
            // Add user message to chat
            chat?.messages.push({
                role: "user",
                content: prompt,
                timeStamp: Date.now(),
                isImage: false,
            });
            // Generate image using imagekit
            const encodedPrompt = encodeURIComponent(prompt);
            const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${userId}-${Date.now()}.png?tr=w-800,h-800`;
            const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" });
            const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;
            // Upload image to imagekit
            const uploadResponse = await imagekit.files.upload({
                file: base64Image,
                fileName: `${userId}-${Date.now()}.png`,
                folder: "quickgpt"
            });
            // Extract image response, save to chat, and respond to client
            const reply = {
                role: "assistant",
                timeStamp: Date.now(),
                content: uploadResponse.url,
                isImage: true,
                isPublished
            };
            res.json({ success: true, message: "Image created", reply });
            chat?.messages.push(reply);
            await chat?.save();
            await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
        }
        else {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
    }
    catch (error) {
        console.error("Error processing image message:", error);
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Server Error" });
    }
};
//# sourceMappingURL=message.controller.js.map