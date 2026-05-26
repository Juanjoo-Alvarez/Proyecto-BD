const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Producto = sequelize.define('producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.STRING
  },

  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  } 

}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;