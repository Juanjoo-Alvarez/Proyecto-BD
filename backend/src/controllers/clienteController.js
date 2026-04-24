const pool = require('../db/conection');

const createCliente = async (req, res) => {
  const { nombre, apellido, telefono, correo } = req.body;

  if (!nombre || !apellido || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO cliente (nombre, apellido, telefono, correo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, apellido, telefono, correo]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El correo ya existe' });
    }
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

const getClientes = async (req, res) => {
  const result = await pool.query('SELECT * FROM cliente');
  res.json(result.rows);
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, correo } = req.body;

  if (!nombre || !apellido || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const result = await pool.query(
      `UPDATE cliente
       SET nombre=$1, apellido=$2, telefono=$3, correo=$4
       WHERE id_cliente=$5
       RETURNING *`,
      [nombre, apellido, telefono, correo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El correo ya existe' });
    }
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM cliente WHERE id_cliente = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

module.exports = {
  createCliente,
  getClientes,
  updateCliente,
  deleteCliente
};