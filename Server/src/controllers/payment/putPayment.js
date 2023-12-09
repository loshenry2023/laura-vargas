// ! Edita un medio de pago.
const { Payment } = require('../../DB_connection');
const showLog = require('../../functions/showLog');

const putPayment = async (req, res) => {
    const { paymentMethodName } = req.body;
    const { id } = req.params;
    showLog('putPayment');
    try {
        if (!paymentMethodName || !id) { throw Error("Data missing"); }
        const existingPay = await Payment.findByPk(id);
        if (!existingPay) {
            showLog(`putPayment: ${paymentMethodName} not found.`);
            return res.status(404).send(`${paymentMethodName} not found.`);
        }
        // Actualizo los campos:
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