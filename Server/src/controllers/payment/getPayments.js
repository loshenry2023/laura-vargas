// ! Obtiene los medios de pago.
const { Payment } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getPayments = async (req, res) => {
    const { token } = req.query;
    showLog(`getPayments`);
    try {
        // Verifico token:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist) {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
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
