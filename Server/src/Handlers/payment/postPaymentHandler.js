const { Payment } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postPaymentHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`postPaymentHandler`);
    // Verifico token. Sólo un superAdmin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(Payment, "Payment", req.body);
    if (resp.created === 'ok') {
      showLog(`postPaymentHandler OK`);
      return res.status(200).json({ "created": "ok", "id": resp.id });
    } else {
      showLog(`postPaymentHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postPaymentHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postPaymentHandler;

