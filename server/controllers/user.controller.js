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

module.exports = {
    register,
};
