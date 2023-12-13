const { Payment } = require('../../DB_connection');
const putReg = require("../../controllers/putReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const putPaymentHandler = async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = req.params;
    showLog(`putPaymentHandler (tkn ${token})`);
    // Verifico token. Sólo un superAdmin puede modificar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    if (!id) { throw Error("Faltan datos"); }

    const resp = await putReg(Payment, "Payment", req.body, id);

    if (resp.created === 'ok') {
      showLog(`putPaymentHandler OK`);
      return res.status(200).json({ "created": "ok" });
    } else {
      showLog(`putPaymentHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`putPaymentHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = putPaymentHandler;

