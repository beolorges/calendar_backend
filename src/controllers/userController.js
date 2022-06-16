const userModel = require('../models/user');
const firebase = require('../utils/firebase');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(req, res) {
        try {
            const user = req.body;
            const uid = await firebase.createNewUser(user.email, user.password);

            delete user.password;
            user.firebase_id = uid;

            const response = await userModel.create(user);
            const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1d' });

            return res.status(200).json({ user, accessToken });
        }
        catch (error) {
            return res.status(500).json({ message: "Usuário não criado" });
        }

    },
    async deleteById(req, res) {
        try {
            const { user_id } = req.params;
            await firebase.deleteUser();
            const response = userModel.deleteById(user_id);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}