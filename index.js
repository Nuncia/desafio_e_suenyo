const express = require('express');
const app = express();
const cors = require('cors');
// const routes = require('./routes/routes');
const fs = require('fs');

const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(cors());
// app.use('/', routes);

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");  
});

app.get('/canciones', (req,res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf-8'));
    res.json(canciones);
});

app.post('/canciones', (req,res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf-8'));
    canciones.push(cancion);
    console.log(canciones)
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción agregada con éxito!');
});

app.delete('/canciones/:id', (req,res) => {
    const {id} = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
    const indice = canciones.findIndex((item) => item.id == id);
    canciones.splice(indice,1);
    fs.writeFileSync('canciones.json',JSON.stringify(canciones));
    res.send('Canción eliminada con éxito');
});

app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`));



