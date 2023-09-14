const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide name"],
        min: 3,
        max: 20,
        trim: true,
        unique: true,
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please provide password"],
        min: 8,
        select: false,
    },

    isAvatarSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("User", UserSchema);
