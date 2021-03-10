const mongoose = require("mongoose")
const studentModel = require("./models/student");
const addressModel = require("./models/address")

mongoose.connect("mongodb://localhost:27017/populate", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Database connected")
});

/*const getAdressStudent = async () => {
    const response = await studentModel.populate("address");
    console.log(response)
}

getAdressStudent(); */

const updateAddress = () => {
    studentModel.updateOne({ _id: "6048d6d4f5d6cb35d850e1d4" }, { address: "6048d6d4f5d6cb35d850e1d7" }).then((response) => {
        console.log(response)
    })
}

studentModel.findOne({ _id: "6048d6d4f5d6cb35d850e1d4" }).populate("address").then((response) => {
    console.log(response)
})