// ! Edita un medio de pago.
const { Payment } = require('../../DB_connection');
const showLog = require('../../functions/showLog');
const checkToken = require('../../functions/checkToken');

const putPayment = async (req, res) => {
    const { paymentMethodName } = req.body;
    const { id } = req.params;
    const { token } = req.query;
    showLog('putPayment');
    try {
        // Verifico token. Sólo un superAdmin puede editar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!paymentMethodName || !id) { throw Error("Data missing"); }
        const existingPay = await Payment.findByPk(id);
        if (!existingPay) {
            showLog(`putPayment: ${id} not found.`);
            return res.status(404).send(`${id} not found.`);
        }
        existingPay.paymentMethodName = paymentMethodName;
        await existingPay.save();
        showLog('putPayment OK');
        return res.status(200).json({ updated: 'ok' });
    } catch (err) {
        showLog(`putPayment ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putPayment;