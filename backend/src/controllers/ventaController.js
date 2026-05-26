const sequelize = require('../db/sequalize');

const registrarVenta = async (req, res) => {

    const {
        cliente,
        empleado,
        producto,
        cantidad
    } = req.body;

    try {

        await sequelize.query(

            `CALL registrar_venta(
                :cliente,
                :empleado,
                :producto,
                :cantidad,
                NULL
            )`,

            {
                replacements: {
                    cliente,
                    empleado,
                    producto,
                    cantidad
                }
            }

        );

        res.json({
            message: 'Venta registrada correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error al registrar venta'
        });
    }
};

module.exports = {
    registrarVenta
};