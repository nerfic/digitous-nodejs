const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressValidator = require ("express-validator")

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

app.post("/signup", 
expressValidator.body("email").isEmail(),
expressValidator.body('password').isLength({ min: 8 }),
expressValidator.body('firstName').isLength({ min: 4 }),
expressValidator.body('city').matches('[paris]'),
async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        const userExist = await userModel.findOne({
            email: req.body.email
        });
        if (!errors.isEmpty()) {
            res.status(400).json({ 
                errors: errors.array()
              });
            return;
          }
        if (userExist) {
            res.status(400).json({
                error: "Email already exist"
            })
            return;
        }
        // if (req.body.password.length < 8) {
        //     res.status(400).json({
        //         error: "Password to short"
        //     })
        //     return;
        // }
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
            city: req.body.city
        }).exec()
        res.status(200).json({
            success: "User created"
        });

    } catch (error) {
        console.log(error)
        res.status(500).send("Erreur")
    }
})

app.post("/login", async (req, res) => {
    try {
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
    } catch (error) {
        res.send("Erreur")
    }
})

app.get("/admin", async (req, res) => {
    try {
        const token = req.headers.authorization
        console.log(token)
        const result = jwt.verify(token.split(" ")[1], config.secret)
        const listUsers = await userModel.find().select(["firstName", "email"]).lean()
        console.log(listUsers)
        console.log(result)
        res.status(200).json({
            message: "connected",
            users: listUsers
        })
    } catch (error) {
        res.status(401).json({
            message: "Pas les droits"
        })
    }
})