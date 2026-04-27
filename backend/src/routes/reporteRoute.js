const express = require('express');
const router = express.Router();
const { getReporteVentas } = require('../controllers/reportController');

router.get('/', getReporteVentas);

module.exports = router;