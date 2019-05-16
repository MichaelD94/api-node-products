const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes  = express.Router();

const ProductController = require('./controllers/ProductController');
const FileController = require('./controllers/FileController');

routes.get('/products',ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.post('/products/:id/files',
multer(multerConfig).single('file'), 
FileController.store);

module.exports = routes;