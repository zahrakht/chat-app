const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((error) => {
            console.log(error.message);
        });
};

module.exports = {
    connectDB,
};
