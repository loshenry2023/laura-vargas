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
        // Verifico token. Sólo un admin puede editar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "admin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!paymentMethodName || !id) { throw Error("Data missing"); }
        const existingPay = await Payment.findByPk(id);
        if (!existingPay) {
            showLog(`putPayment: ${paymentMethodName} not found.`);
            return res.status(404).send(`${paymentMethodName} not found.`);
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