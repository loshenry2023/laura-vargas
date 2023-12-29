const { conn, User } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postUserHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const { id } = req.params;
    showLog(`postUserHandler`);
    // Verifico token. Sólo un superAdmin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(checked.role !== "superAdmin" ? `Wrong role.` : `Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(User, "User", req.body, conn);
    if (resp.created === 'ok') {
      showLog(`postUserHandler OK`);
      return res.status(200).json({ "created": "ok", "id": resp.id });
    } else {
      showLog(`postUserHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postUserHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postUserHandler;

