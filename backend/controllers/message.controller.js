import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Send Message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { textMessage } = req.body;

        console.log("Sender:", senderId);
        console.log("Receiver:", receiverId);
        console.log("Body:", req.body);

        if (!textMessage || textMessage.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message: textMessage
        });

        conversation.messages.push(newMessage._id);

        await conversation.save();

        // Real Time Socket
        const receiverSocketId = getReceiverSocketId(receiverId);

        console.log("Receiver Socket ID:", receiverSocketId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.error("Send Message Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Messages
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({
                success: true,
                messages: []
            });
        }

        return res.status(200).json({
            success: true,
            messages: conversation.messages
        });

    } catch (error) {
        console.error("Get Message Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};