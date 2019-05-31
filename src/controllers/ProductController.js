const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const File = require ('../models/File');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({/* condições where e etc*/}, {page, limit: 10 });        
        return res.json(products);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id).populate({
            path: 'files',
            options: { sort : {createdAt: -1 } }
        });

        return res.json(product);
    },

    async store(req, res){
        const product = await Product.create(req.body);

        return res.json(product);
    },

    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
             new: true 
            });

        return res.json(product);
    },

    async destroy(req, res){
        const product = await Product.findById(req.params.id);

        await File.findByIdAndRemove(product.files);
        await Product.findByIdAndRemove(req.params.id);
        
        return res.send();
    }
};