const firebase = require('../utils/firebase');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const firebase_id = await firebase.login(email, password);

            const user = await userModel.getByFirebaseId(firebase_id);
            if (!user)
                throw new Error("Usuário não encontrado");

            const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1d' });

            return res.status(200).json({ user, accessToken });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}