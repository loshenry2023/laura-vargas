const { conn, Calendar, User, Service, Client, Branch } = require('../../DB_connection');
const putReg = require("../../controllers/putReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const putCalendarHandler = async (req, res) => {

  try {
    const { token } = req.body;
    const { id } = req.params;
    showLog(`putCalendarHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }

    if (!id) { throw Error("Faltan datos"); }
    const resp = await putReg(Calendar, "Calendar", req.body, id, conn, User, Service, Client, Branch);
    if (resp.created === 'ok') {
      showLog(`putCalendarHandler OK`);
      return res.status(200).json({ "updated": "ok" });
    } else {
      showLog(`putCalendarHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`putCalendarHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = putCalendarHandler;

