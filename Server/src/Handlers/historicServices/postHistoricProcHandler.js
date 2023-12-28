const { conn, HistoryService, Client, Incoming } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postHistoricProcHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`postHistoricProcHandler`);
    // Verifico token. Sólo un superAdmin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(HistoryService, "HistoryService", req.body, conn, Client, Incoming);

    if (resp.created === 'ok') {
      showLog(`postHistoricProcHandler OK`);
      return res.status(200).json({ "created": "ok" });
    } else {
      showLog(`postHistoricProcHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postHistoricProcHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postHistoricProcHandler;

