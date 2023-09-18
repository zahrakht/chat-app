const {
    register,
    login,
    setAvatar,
    getUsers,
} = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/set-avatar/:id", setAvatar);
userRouter.get("/get-users/:id", getUsers);

module.exports = userRouter;
