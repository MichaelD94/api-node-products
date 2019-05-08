const express = require('express');
const mongoose = require ('mongoose');
const requireDir = require('require-dir');

//iniciando o app
const app = express();
app.use(express.json());

//iniciando o DB
mongoose.connect(
    'mongodb://localhost:27017/apinode',
     { useNewUrlParser: true }
);
requireDir('./src/models');

//Rotas
app.use('/api', require("./src/Routes"));

app.listen(3001);