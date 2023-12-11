const { Payment } = require('../DB_connection');
const deleteReg = require("../controllers/deleteReg");
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');

const deletePaymentHandler = async (req, res) => {
  showLog(`deletePaymentHandler`);
  try {
    const { id } = req.params;
    const { token } = req.query;
    // Verifico token. Sólo un superAdmin puede eliminar:
    // if (!token) { throw Error("Token required"); }
    // const checked = await checkToken(token);
    // if (!checked.exist || checked.role !== "superAdmin") {
    //     showLog(`Wrong token.`);
    //     return res.status(401).send(`Unauthorized.`);
    // }
    const resp = await deleteReg(Payment, id, "Payment");
    if (resp.deleted === 'ok') {
      showLog(`deletePaymentHandler OK`);
      return res.status(200).json({ deleted: "ok" });
    } else {
      showLog(`deletePaymentHandler ERROR-> ${resp.message}`);
      return res.status(404).send(resp.message);
    }
  } catch (err) {
    showLog(`deletePaymentHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = deletePaymentHandler;
