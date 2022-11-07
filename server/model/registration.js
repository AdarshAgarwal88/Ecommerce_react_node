const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let registrationSchama = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        username: {
            type: String,
        },
        phone: {
            type: Number,
        },
        cpassword: {
            type: String,
        },
    },
    {
        collection: "user",
    }
);

module.exports = mongoose.model("user", registrationSchama);