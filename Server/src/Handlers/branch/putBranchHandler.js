const { Branch } = require('../../DB_connection');
const putReg = require("../../controllers/putReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const putBranchHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const { id } = req.params;
    showLog(`putBranchHandler`);
    // Verifico token. Sólo un superAdmin puede modificar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(checked.mensaje);
      return res.status(checked.code).send(checked.mensaje);
    }
    if (checked.role !== "superAdmin") {
      showLog(checked.role !== "superAdmin" ? `Wrong role.` : `Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    if (!id) { throw Error("Faltan datos"); }

    const resp = await putReg(Branch, "Branch", req.body, id);

    if (resp.created === 'ok') {
      showLog(`putBranchHandler OK`);
      return res.status(200).json({ "updated": "ok" });
    } else {
      showLog(`putBranchHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`putBranchHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = putBranchHandler;

