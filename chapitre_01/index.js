const express = require('express');
const app = express();

const authors = ["Lawrence Nowell, UK", "William Shakespeare, UK", "Lawrence Nowell, UK", "Oscar Wilde, UK"]
const books = ["Beowulf", "Hamlet, Othello, Romeo and Juliet, MacBeth", "Oliver Twist, A Christmas Carol", "The Picture of Dorian Gray, The Importance of Being Earnest"]

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

app.get("/", (req, res) => {
    res.send("Authors API");
})

// app.get("*", (req, res) => {
//     res.send("Error: 404");
// })

app.get("/authors/:id", (req, res) => {
    if (authors[req.params.id] === undefined) {
        res.send(`The author with the ID ${req.params.id} does not exist`)
    } else {
        res.send(`${authors[req.params.id]}`)
    }
})

app.get("/authors/:bookid/books", (req, res) => {
    res.send(`${books[req.params.bookid]}`)
})

app.get("/cars/", (req, res) => {
    res.send("error")
})