// ! Obtiene los medios de pago.
const axios = require('axios');
const { Payment } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const getPayments = async (req, res) => {
    try {
        showLog(`getPayments`);
        reg = await Payment.findAll({
            attributes: ["id", "paymentMethodName"],
        });
        showLog(`getPayments OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getPayments ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getPayments;
