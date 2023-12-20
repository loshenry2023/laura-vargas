const { HistoryService, Incoming, Client } = require('../../DB_connection');
const getReg = require("../../controllers/getReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getHistoricProcHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;
    showLog(`getHistoricProcHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    if (!id) { throw Error("Faltan datos"); }
    const resp = await getReg(HistoryService, "HistoryService", Incoming, Client, "", "", id);
    if (resp) {
      showLog(`getHistoricProcHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getHistoricProcHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getHistoricProcHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getHistoricProcHandler;

