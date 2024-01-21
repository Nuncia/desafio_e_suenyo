const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(cors());
// app.use('/', routes);

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");  
});

app.post('/canciones', (req,res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf-8'));
    console.log('cancion: ', cancion)
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.send('Canción agregada con éxito!');
})

app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`));



