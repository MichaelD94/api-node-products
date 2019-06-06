const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const requireDir = require('require-dir');
const path = require('path');

//iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

//iniciando o DB
mongoose.connect(
    'mongodb+srv://dbMD:35636896@api-products-ddyjh.mongodb.net/test?retryWrites=true&w=majority',
     { useNewUrlParser: true },     
     );
mongoose.set('useCreateIndex', true);
requireDir('./src/models');

//Rotas
app.use('/api', require("./src/Routes"));
app.use('/files', express.static(path.resolve(__dirname,'tmp','uploads')));

app.listen(process.env.PORT || 3001);