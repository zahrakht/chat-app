const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect.js");
const userRouter = require("./routes/user.router.js");
const messageRouter = require("./routes/message.router.js");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        const server = app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
        createSocket(server);
    } catch (error) {
        console.log(error);
    }
};

const createSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        });
        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);

            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-receive", data.message);
            }
        });
    });
};

start();
