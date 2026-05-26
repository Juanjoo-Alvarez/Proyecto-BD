const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const usuario = await Usuario.findOne({
            where: {
                username
            }
        });

        if (!usuario) {

            return res.status(401).json({
                error: 'Usuario no encontrado'
            });
        }

        if (usuario.password !== password) {

            return res.status(401).json({
                error: 'Password incorrecto'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                username: usuario.username,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            token,
            rol: usuario.rol
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error en login'
        });
    }
};

module.exports = {
    login
};