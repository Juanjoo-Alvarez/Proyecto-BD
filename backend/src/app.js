const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db/sequalize');

const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoute');
const reportRoutes = require('./routes/reporteRoute');
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
    .then(() => {
        console.log('Conexion Sequelize exitosa');
    })
    .catch(err => {
        console.error('Error Sequelize:', err);
    });

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clientes", clientRoutes);
app.use("/reporte", reportRoutes);
app.use("/api/ventas", ventaRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});