const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect.js");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

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
