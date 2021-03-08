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

const associations = [
    {
        id: 'restau-du-coeur',
        name: 'Restau du <3',
        img: 'img',
        description: 'desc'
    }, {
        id: 'la-croix-rouge',
        name: 'La croix rouge',
        img: 'img',
        description: 'desc'
    }, {
        id: 'konexio',
        name: 'Konexio',
        img: 'img',
        description: 'desc'
    }
]

app.listen(port, () => {
    console.log('Server on, port', port)
})

app.get('/', (req, res) => {
    res.send("Restau du <3, croix rouge, konexio")
})

app.get('/associations/:name', (req, res) => {
    for (let i = 0; i < associations.length; i++) {
        if (req.params.name === associations[i].id) {
            return res.send(associations[i])
        }
    }
    res.send('Error: association inconnu')
})