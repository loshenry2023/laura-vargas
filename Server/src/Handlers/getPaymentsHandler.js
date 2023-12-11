const { Payment } = require('../DB_connection');
const getReg = require("../controllers/getReg");
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');

const getPaymentsHandler = async (req, res) => {
  showLog(`getPaymentsHandler`);
  try {
    const { token } = req.query;
    // Verifico token:
    // if (!token) { throw Error("Token required"); }
    // const checked = await checkToken(token);
    // if (!checked.exist) {
    //     showLog(`Wrong token.`);
    //     return res.status(401).send(`Unauthorized.`);
    // }
    const resp = await getReg(Payment, "Payment");
    if (resp) {
      showLog(`getPaymentsHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getPaymentsHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getPaymentsHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getPaymentsHandler;
