// ! Almacena un nuevo pago, si no es repetido.
const { Payment } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const { Op } = require('sequelize');

const postPayment = async (req, res) => {
    const { paymentMethodName } = req.body;
    const { token } = req.query;
    showLog(`postPayment`);
    try {
        // Verifico token. Sólo un superAdmin puede agregar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!paymentMethodName) { throw Error("Data missing"); }
        const payLowercase = paymentMethodName.toLowerCase();
        const existingPayment = await Payment.findOne({
            where: { paymentMethodName: { [Op.iLike]: payLowercase } },
        });
        if (existingPayment) {
            showLog(`postPayment: ${paymentMethodName} already exists`);
            return res.status(409).send(`${paymentMethodName} already exists.`);
        }
        const [PayCreated, created] = await Payment.findOrCreate({
            where: { paymentMethodName },
        });
        showLog(`postPayment OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`postPayment ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postPayment;