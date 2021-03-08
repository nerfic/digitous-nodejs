const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/garage', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
});

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    created: Date
});

const carModel = mongoose.model("cars", carSchema);

// carModel.deleteMany({})
//     .then(() => {
//         carModel.create([{
//             brand: "Renault",
//             model: "Espace",
//             year: 1999
//         }, {
//             brand: "Renault",
//             model: "Scenic",
//             year: 2004
//         }, {
//             brand: "Peugeot",
//             model: "308",
//             year: 2017
//         }
//         ])
//     })

carModel.findById({
    _id: mongoose.Types.ObjectId("60462abadb30163fa008fa60")
}).then((response) => console.log(response))

carModel.update(
    { model: "Espace" },
    { year: 2000 }
).then((response) => {
    console.log("J'ai update", response)
})

carModel.deleteMany({
    brand: "Renault"
}).then(response => {
    console.log("J'ai delete", response)
})

carModel.insertMany(
    [{
        brand: "Aston Martin",
        model: "DB9",
        year: 2010
    },
    {
        brand: "Range Rover",
        model: "Discovery Sport",
        year: 2017
    }]
).then(response => {
    console.log("Ok j'ai add 2 voitures", response)
})

carModel.find({
    year: { $gt: 2015 }
}).then(response => {
    console.log("Voici les voitures sortie après 2015:", response)
})

carModel.find({
    model: /o/
}).then(response => {
    console.log("Voici les modèle contenant un O", response)
})