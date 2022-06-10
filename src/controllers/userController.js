const userModel = require('../models/user');
const firebase = require('../utils/firebase');

module.exports = {
    async create(req, res) {
        try {
            const user = req.body;
            const uid = await firebase.createNewUser(user.email, user.password);

            delete user.password;
            user.firebase_id = uid;

            const response = await userModel.create(user);
            return res.status(200).json(response);
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