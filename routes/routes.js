const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");  
});

router.get('/canciones', (req,res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf-8'));
    res.json(canciones)
});

router.post('/canciones', (req,res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
})

router.delete('/canciones/:id', (req,res) => {
    const {id} = req.params;
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
    const indice = canciones.findIndex((item) => item.id == id);
    canciones.splice(indice,1);
    fs.writeFileSync('canciones.json',JSON.stringify(canciones));
})

module.exports = router;