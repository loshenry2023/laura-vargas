const { CatGastos } = require('../../DB_connection');
const putReg = require("../../controllers/putReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const putCatHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const { id } = req.params;
    showLog(`putCatHandler`);
    // Verifico token. Sólo un superAdmin puede modificar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    if (!id) { throw Error("Faltan datos"); }

    const resp = await putReg(CatGastos, "CatGastos", req.body, id);

    if (resp.created === 'ok') {
      showLog(`putCatHandler OK`);
      return res.status(200).json({ "updated": "ok" });
    } else {
      showLog(`putCatHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`putCatHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = putCatHandler;

