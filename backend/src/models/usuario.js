const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Usuario = sequelize.define('usuario', {

    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {

    tableName: 'usuario',
    timestamps: false

});

module.exports = Usuario;