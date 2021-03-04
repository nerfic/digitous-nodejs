const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const port = 8000
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
     extended: true 
}));

const students = []

app.listen(port, () => {
    console.log('Server on, port', port)
})

app.get('/students', (req, res) => {
    res.send(students)
})

app.post('/students/add', (req, res) => {
    students.push(req.body.name)
    res.send(`Ok j'ai add ${req.body.name}`)
    console.log(students)
})