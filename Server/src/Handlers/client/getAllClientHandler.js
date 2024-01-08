const { Client } = require('../../DB_connection');
const getReg = require("../../controllers/getReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getAllClientHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`getAllClientHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(checked.mensaje);
      return res.status(checked.code).send(checked.mensaje);
    }
    const resp = await getReg(Client, "Clients", "", "", "", "", "", req.query);
    const { count, rows } = resp
    if (count >= 0) {
      showLog(`getAllClientHandler OK`);
      return res.status(200).json({ count, rows });
    } else {
      showLog(`getAllClientHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getAllClientHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getAllClientHandler;

