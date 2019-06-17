const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userConfig = require('../config/user')

const User = mongoose.model('User');

function genereteToken(params = {}) {
    return jwt.sign(params, userConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async register(req, res) {
        const { email } = req.body;

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.json({
            user,
            token: genereteToken({ id: user.id })
        });
    },

    async index(req, res) {

        const { page = 1 } = req.query;
        const user = await User.paginate({/* condições where e etc*/ }, { page, limit: 10 });
        return res.json(user);

    },

    async show(req, res) {
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(user);
    },

    async destroy(req, res) {

        await User.findByIdAndRemove(req.params.id);

        return res.send();
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: ' User not Found ' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid Password' });

        user.password = undefined;

        res.send({
            user,
            token: genereteToken({ id: user.id })
        });
    }


}