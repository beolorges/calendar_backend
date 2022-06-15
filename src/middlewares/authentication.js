const jwt = require('jsonwebtoken');
module.exports = {
    async authenticate(req, res, next) {
        const authHeader = req.headers['authorization']
        const [scheme, token] = authHeader && authHeader.split(' ');

        try {
            if (!token) throw new error("Token não informado");

            if (!/^Bearer$/i.test(scheme)) throw new error("Token mal formatado");

            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) throw new error('Token de autorização inválido');
                req.session = data;
                next();
            });

        } catch (error) {
            return res.status(401).json({ message: error.message });
        }

    },
    async isAuthenticated(req, res) {
        const authHeader = req.headers['authorization']
        const [scheme, token] = authHeader && authHeader.split(' ');

        try {
            if (!token) throw new error("Token não informado");

            if (!/^Bearer$/i.test(scheme)) throw new error("Token mal formatado");

            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) throw new error('Token de autorização inválido');
                req.session = data;
                return res.status(200).json({ message: 'Usuário autenticado' });
            });

        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}