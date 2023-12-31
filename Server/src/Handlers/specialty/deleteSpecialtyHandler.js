const { Specialty } = require('../../DB_connection');
const deleteReg = require("../../controllers/deleteReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const deleteSpecialtyHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.body;
    showLog(`deleteSpecialtyHandler`);
    // Verifico token. Sólo un superAdmin puede eliminar:
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
    const resp = await deleteReg(Specialty, id, "Specialty");
    if (resp.deleted === 'ok') {
      showLog(`deleteSpecialtyHandler OK`);
      return res.status(200).json({ deleted: "ok" });
    } else {
      showLog(`deleteSpecialtyHandler ERROR-> ${resp.message}`);
      return res.status(404).send(resp.message);
    }
  } catch (err) {
    showLog(`deleteSpecialtyHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = deleteSpecialtyHandler;
