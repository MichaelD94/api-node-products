const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const FileController = require('./controllers/FileController');
const UserController = require('./controllers/UserController');

//rotas do usuario
routes.post('/users', UserController.register);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);
routes.post('/users/autenticar', UserController.authenticate);

//rotas do produto
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

//rotas dos arquivos
routes.post('/products/:id/files',
    multer(multerConfig).single('file'),
    FileController.store);

module.exports = routes;