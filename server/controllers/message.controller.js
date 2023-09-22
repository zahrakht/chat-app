const Message = require("../models/message.model");

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        if (!from || !to || !message) {
            return res.json({ status: false, msg: "Invalid request" });
        }
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {
            return res.json({
                status: true,
                msg: "Message added successfully",
            });
        }
        return res.json({
            status: false,
            msg: "Failed to add message to the database",
        });
    } catch (error) {
        next(error);
    }
};
const getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        if (!from || !to) {
            return res.json({ status: false, msg: "Invalid request" });
        }
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        return res.json({ status: true, messages: projectMessages });
    } catch (error) {
        next(error);
    }
};

module.exports = { addMessage, getAllMessages };
