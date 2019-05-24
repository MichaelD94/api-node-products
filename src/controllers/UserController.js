const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    async register(req, res){
        const { email } = req.body;

        if(await User.findOne({ email }))
            return res.status(400).send({error: 'User already exists'});
        
        const user = await User.create(req.body);

        user.password = undefined;

        return res.json(user);        
    },

    async index(req, res) {

        const { page = 1 } = req.query;
        const user = await User.paginate({/* condições where e etc*/}, {page, limit: 10 });
        return res.json(user);

    },

    async show(req, res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async update(req, res){
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
             new: true 
            });

        return res.json(user);
    },

    async destroy(req, res){
        
        await User.findByIdAndRemove(req.params.id);
        
        return res.send();
    }
}