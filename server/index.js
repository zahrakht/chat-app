const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect.js");
const userRouter = require("./routes/user.router.js");
const messageRouter = require("./routes/message.router.js");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
