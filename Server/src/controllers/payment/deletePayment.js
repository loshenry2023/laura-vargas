// ! Elimina un medio de pago.
const { Payment } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const deletePayment = async (req, res) => {
    const { id } = req.params;
    showLog(`deletePayment ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        const payToDelete = await Payment.findByPk(id);
        if (!payToDelete) { throw Error("ID not found"); }
        await payToDelete.destroy();
        showLog(`deletePayment OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deletePayment ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deletePayment;
