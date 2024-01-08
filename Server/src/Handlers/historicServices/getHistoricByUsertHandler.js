const { HistoryService, Incoming, Client } = require('../../DB_connection');
const getReg = require("../../controllers/getReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getHistoricByUsertHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;
    showLog(`getHistoricByUsertHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(checked.mensaje);
      return res.status(checked.code).send(checked.mensaje);
    }
    if (!id) { throw Error("Faltan datos"); }
    const resp = await getReg(HistoryService, "HistoryServiceUser", Incoming, Client, "", "", id);
    if (resp) {
      showLog(`getHistoricByUsertHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getHistoricByUsertHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getHistoricByUsertHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getHistoricByUsertHandler;

