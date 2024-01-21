const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3010;

app.use(express.json());

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
    console.log('cancion: ', cancion);
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción agregada con éxito!');
});

app.put('/canciones/:id', (req,res) => {
    const {id} = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
    const indice = canciones.findIndex((item) => item.id == id);
    canciones[indice] = cancion;
    fs.writeFileSync('canciones.json',JSON.stringify(canciones));
    res.send('Canción modificada con éxito');
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
