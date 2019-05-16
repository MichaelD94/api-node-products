const File = require('../models/File');
const Product = require('../models/Products');

class FileController {
    async store(req, res) {
        const product = await Product.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        product.files.push(file);

        await product.save();

        //req.io.sockets.in(product._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();