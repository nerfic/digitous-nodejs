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
        img: 'https://www.tousbenevoles.org/images/association/1511946154.png',
        description: 'Les Restaurants du cœur – Les Relais du cœur, connus sous le nom de Les Restos du cœur, sont une association loi de 1901 à but non lucratif et reconnue d\'utilité publique, créée en France par Coluche en 1985.'
    }, {
        id: 'la-croix-rouge',
        name: 'La croix rouge',
        img: 'https://www.tousbenevoles.org/images/association/1468321597.png',
        description: 'La Croix-Rouge française est une association d\'aide humanitaire française fondée en 1864. Elle a pour objectif de venir en aide aux personnes en difficulté en France et à l\'étranger. Ses missions fondamentales sont l\'urgence, le secourisme, l\'action sociale, la formation, la santé et l\'action internationale.'
    }, {
        id: 'konexio',
        name: 'Konexio',
        img: 'https://www.konexio.eu/uploads/1/2/0/2/120245745/konexio-logo_1.png',
        description: 'Konexio est une association et un organisme de formation qui forme aux compétences numériques - des plus basiques aux plus avancées - afin de faciliter l\'inclusion socioprofessionnelle.'
    }
]

const contacts = [{}]

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

app.get('/admin', (req, res) => {
    res.send(contacts)
})

app.post('/form/contact', (req, res) => {
    res.send("admin")
})