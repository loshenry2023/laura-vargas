// ! Obtiene los medios de pago desde la BD.
const axios = require('axios');
const { Payment } = require('../DB_connection');
const showLog = require("../functions/showLog");

const getPayments = async (req, res) => {
    try {
        showLog(`getPayments`);
        reg = await Payment.findAll({
            attributes: ["id", "paymentMethodName"],
            where: { active: "1" },
        });
        showLog(`getPayments OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getPayments ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getPayments;
