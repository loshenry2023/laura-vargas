const { CatGastos } = require('../../DB_connection');
const getReg = require("../../controllers/getReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getCatHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`getCatHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(checked.mensaje);
      return res.status(checked.code).send(checked.mensaje);
    }
    const resp = await getReg(CatGastos, "CatGastos");
    if (resp) {
      showLog(`getCatHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getCatHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getCatHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getCatHandler;
