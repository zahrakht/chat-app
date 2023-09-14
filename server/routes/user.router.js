const { register } = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/register", register);

module.exports = userRouter;
