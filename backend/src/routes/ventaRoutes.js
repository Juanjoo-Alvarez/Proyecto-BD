const express = require('express');

const router = express.Router();

const authorize = require('../middleware/auth');

const {
    registrarVenta
} = require('../controllers/ventaController');

router.post(
    '/',
    authorize([
        'admin',
        'vendedor',
        'gerente'
    ]),
    registrarVenta
);

module.exports = router;