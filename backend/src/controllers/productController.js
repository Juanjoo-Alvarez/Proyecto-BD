const Producto = require('../models/producto');

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProducto = async (req, res) => {

  const {
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_proveedor
  } = req.body;

  try {

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_proveedor
    });

    res.status(201).json(nuevoProducto);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al crear producto'
    });
  }
};

const updateProducto = async (req, res) => {

  const { id } = req.params;

  const {
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_proveedor
  } = req.body;

  try {

    const producto = await Producto.findByPk(id);

    if (!producto) {

      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    await Producto.update(
      {
        nombre,
        descripcion,
        precio,
        stock,
        id_categoria,
        id_proveedor
      },
      {
        where: {
          id_producto: id
        }
      }
    );

    const actualizado = await Producto.findByPk(id);

    res.json(actualizado);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al actualizar producto'
    });
  }
};

const deleteProducto = async (req, res) => {

  const { id } = req.params;

  try {

    const producto = await Producto.findByPk(id);

    if (!producto) {

      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    await Producto.destroy({
      where: {
        id_producto: id
      }
    });

    res.json({
      message: 'Producto eliminado'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al eliminar producto'
    });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
};