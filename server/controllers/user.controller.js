const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.json({ msg: "Username already exists", status: false });
        }
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.json({ msg: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ user, status: true });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                msg: "Incorrect Username or password",
                status: false,
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({
                msg: "Incorrect Username or password",
                status: false,
            });
        }
        delete user.password;
        return res.json({ user, status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
