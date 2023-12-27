const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const sendMail = require("../../functions/sendMail");

const sendMailHandler = async (req, res) => {

  console.log(req.body)
  try {
    const { token } = req.body;
    showLog(`sendMailHandler`);
    // Verifico token.:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await sendMail(req.body);
    if (resp.sent === 'ok') {
      showLog(`sendMailHandler OK`);
      return res.status(200).json({ sent: "ok" });
    } else {
      showLog(`sendMailHandler ERROR-> ${resp.message}`);
      return res.status(404).send(resp.message);
    }
  } catch (err) {
    showLog(`sendMailHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = sendMailHandler;
