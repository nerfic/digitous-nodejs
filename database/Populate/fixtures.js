const mongoose = require("mongoose");
const studentModel = require("./models/student");
const addressModel = require("./models/address")

mongoose.connect("mongodb://localhost:27017/populate", () => {
    console.log("Database connected")
});

studentModel.deleteMany({}).then(() => {
    studentModel.create([
        {
            firstName: "Xavier",
            surName: "Masterclass fullstack",
        },
        {
            firstName: "Allan",
            surName: "Nerfic"
        },
        {
            firstName: "Nicolas",
            surName: "bg"
        }
    ])
})

addressModel.deleteMany({}).then(() => {
    addressModel.create([
        {
            streetName: "rue de la réunion",
            streetNumber: "15",
            postCode: "75020",
            city: "Paris"
        },
        {
            streetName: "villa de lourcine",
            streetNumber: "1",
            postCode: "75014",
            city: "Paris"
        },
        {
            streetName: "avenue de la grande armée",
            streetNumber: "7",
            postCode: "75016",
            city: "Paris"
        }
    ])
})