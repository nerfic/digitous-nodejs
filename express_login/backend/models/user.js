const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordConfirm: String,
    firstName: String,
    surname: String,
    city: String,
    dateOfBirth: Date
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel