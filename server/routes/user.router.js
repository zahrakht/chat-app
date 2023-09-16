const {
    register,
    login,
    setAvatar,
} = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/set-avatar/:id", setAvatar);

module.exports = userRouter;
