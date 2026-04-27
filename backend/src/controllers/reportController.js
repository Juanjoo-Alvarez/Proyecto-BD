const pool = require('../db/conection');

const getReporteVentas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vista_reporte_ventas');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};

module.exports = { getReporteVentas };