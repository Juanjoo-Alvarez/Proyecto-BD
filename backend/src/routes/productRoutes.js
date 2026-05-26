const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const { getProductos, createProducto, updateProducto, deleteProducto } = require('../controllers/productController');

router.get('/', getProductos);
router.post('/', authorize(['admin', 'inventario']), createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;