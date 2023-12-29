const { Specialty } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postSpecialtyHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`postSpecialtyHandler`);
    // Verifico token. Sólo un superAdmin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(checked.role !== "superAdmin" ? `Wrong role.` : `Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(Specialty, "Specialty", req.body);
    if (resp.created === 'ok') {
      showLog(`postSpecialtyHandler OK`);
      return res.status(200).json({ "created": "ok", "id": resp.id });
    } else {
      showLog(`postSpecialtyHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postSpecialtyHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postSpecialtyHandler;

