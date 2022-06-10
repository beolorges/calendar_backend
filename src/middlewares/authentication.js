const jwt = require('jsonwebtoken');
module.exports = {
    async authenticate(req, res, next) {
        const authHeader = request.headers['authorization']
        const [scheme, token] = authHeader && authHeader.split(' ');

        try {
            if (!token) throw new error("Token não informado");

            if (!/^Bearer$/i.test(scheme)) throw new error("Token mal formatado");

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                if (err) throw new error('Token de autorização inválido');
                request.session = data;
                next();
            });

        } catch (error) {
            return res.status(401).json({ message: error.message });
        }

    }
}