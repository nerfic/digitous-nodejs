const express = require("express");
const expressHandlebars = require("express-handlebars")

const app = express();
const port = 8000;
let logged = false

app.engine('handlebars', expressHandlebars());
app.set("view engine", "handlebars");
app.use(express.static('public'));

app.listen(port, () => {
    console.log("Serveur on " + port)
})

app.get("/", (req, res) => {
    res.render("home")
})

app.use(express.urlencoded({ extended: true }))
app.post("/login", (req, res) => {
    console.log(req.body)
    logged = true;
    res.redirect("/success")
})

app.get("/success", (req, res) => {
    if (logged) {
        res.send("Login success")
    } else {
        res.redirect("/")
    }
})