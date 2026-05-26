const jwt = require('jsonwebtoken');

const authorize = (roles) => {

    return (req, res, next) => {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                error: 'Token requerido'
            });
        }

        const token = authHeader.split(' ')[1];

        try {

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

            if (!roles.includes(req.user.rol)) {

                return res.status(403).json({
                    error: 'Acceso denegado'
                });
            }

            next();

        } catch (error) {

            return res.status(401).json({
                error: 'Token inválido'
            });
        }
    };
};

module.exports = authorize;