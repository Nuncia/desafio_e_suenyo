const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`));



