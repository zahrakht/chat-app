const {
    addMessage,
    getAllMessages,
} = require("../controllers/message.controller");

const messageRouter = require("express").Router();
messageRouter.post("/addMessage", addMessage);
messageRouter.post("/getMessages", getAllMessages);
module.exports = messageRouter;
