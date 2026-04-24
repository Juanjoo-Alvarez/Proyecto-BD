const pool = require('../db/conection');

const getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = req.body;

  // Validación básica
  if (!nombre || !descripcion || !precio || !stock || !id_categoria || !id_proveedor) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, id_proveedor)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, descripcion, precio, stock, id_categoria, id_proveedor]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = req.body;

  // Validación básica
  if (!nombre || !descripcion || precio == null || stock == null || !id_categoria || !id_proveedor) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validación lógica
  if (precio < 0 || stock < 0) {
    return res.status(400).json({ error: 'Precio y stock deben ser positivos' });
  }

  try {
    // Verificar si existe producto
    const exists = await pool.query(
      'SELECT * FROM producto WHERE id_producto = $1',
      [id]
    );

    if (exists.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar FK categoría
    const categoria = await pool.query(
      'SELECT * FROM categoria WHERE id_categoria = $1',
      [id_categoria]
    );

    if (categoria.rows.length === 0) {
      return res.status(400).json({ error: 'Categoría no válida' });
    }

    // Verificar FK proveedor
    const proveedor = await pool.query(
      'SELECT * FROM proveedor WHERE id_proveedor = $1',
      [id_proveedor]
    );

    if (proveedor.rows.length === 0) {
      return res.status(400).json({ error: 'Proveedor no válido' });
    }

    // Update
    const result = await pool.query(
      `UPDATE producto
       SET nombre = $1, descripcion = $2, precio = $3, stock = $4, id_categoria = $5, id_proveedor = $6
       WHERE id_producto = $7
       RETURNING *`,
      [nombre, descripcion, precio, stock, id_categoria, id_proveedor, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Verificar si está en uso
    const check = await pool.query(
      'SELECT * FROM descripcion_venta WHERE id_producto = $1',
      [id]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar el producto porque tiene ventas asociadas'
      });
    }

    // 2. Eliminar si no está en uso
    await pool.query('DELETE FROM producto WHERE id_producto = $1', [id]);

    res.json({ message: 'Producto eliminado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
};