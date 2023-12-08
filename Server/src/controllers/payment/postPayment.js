// ! Almacena un nuevo pago, si no es repetido.
const { Payment } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postPayment = async (req, res) => {
    const { paymentMethodName } = req.body;
    showLog(`postPayment`);
    try {
        if (!paymentMethodName) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con la misma descripción:
        const payLowercase = paymentMethodName.toLowerCase();
        const existingPayment = await Payment.findOne({
            where: { paymentMethodName: { [Op.iLike]: payLowercase } },
        });
        if (existingPayment) {
            showLog(`postPayment: ${paymentMethodName} already exists`);
            return res.status(409).send(`${paymentMethodName} already exists.`);
        }
        // Creo el registro si no existe:
        const [PayCreated, created] = await Payment.findOrCreate({
            where: { paymentMethodName, active: "1" },
        });
        showLog(`postPayment OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`postPayment ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postPayment;