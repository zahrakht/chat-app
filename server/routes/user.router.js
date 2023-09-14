const { register, login } = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = userRouter;
