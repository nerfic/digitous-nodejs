const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("./config")
const userModel = require("./models/user")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.listen(config.expressPort, () => {
    console.log("NodeJS server on, port", config.expressPort)
})

mongoose.connect(`mongodb://localhost:${config.mongoDBPort}/login`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected, port', config.mongoDBPort)
})

app.post("/signup", async (req, res) => {
    try {
        const userExist = await userModel.findOne({
            email: req.body.email
        });
        if (userExist) {
            res.status(400).json({
                error: "Email already exist"
            })
            return;
        }
        if (req.body.password < 8) {
            res.status(400).json({
                error: "Password to short"
            })
            return;
        }
        if (req.body.password !== req.body.passwordConfirm) {
            res.status(400).json({
                error: "Password not match"
            })
            return;
        }
        await userModel.create({
            email: req.body.email,
            firstName: req.body.firstName,
            surname: req.body.surname,
            dateOfBirth: req.body.dateOfBirth,
            password: bcrypt.hashSync(req.body.password),
        })
        res.send("User create");

    } catch (error) {
        console.log(error)
        res.status(500).send("Erreur")
    }
})

app.post("/login", async (req, res) => {
    const user = await userModel.findOne({
        email: req.body.email
    })

    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 3600
        })
        res.status(200).json({
            message: "Connected",
            token: token
        })
    } else {
        res.status(401).send("Mauvais identifiants")
    }
})

app.get("/admin", async (req, res) => {
    try {
        const token = req.headers.authorization
        const result = jwt.verify(token.split(" ")[1], config.secret)
        const user = await userModel.findOne({
            _id: result.id
        }).exec();
        res.status(200).send("connected")
    } catch (error) {
        res.status(401).send("Pas les droits")
    }
})