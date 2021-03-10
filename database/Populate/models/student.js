const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: String,
    surName: String,
    address: { type: mongoose.Types.ObjectId, ref: "address" }
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;