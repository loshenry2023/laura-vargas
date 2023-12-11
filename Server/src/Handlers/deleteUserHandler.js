const { User } = require('../DB_connection');
const deleteReg = require("../controllers/deleteReg");
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');

const deleteUserHandler = async (req, res) => {
  showLog(`deleteUserHandler`);
  try {
    const { id } = req.params;
    const { token } = req.query;
    // Verifico token. Sólo un superAdmin puede eliminar:
    // if (!token) { throw Error("Token required"); }
    // const checked = await checkToken(token);
    // if (!checked.exist || checked.role !== "superAdmin") {
    //     showLog(`Wrong token.`);
    //     return res.status(401).send(`Unauthorized.`);
    // }
    const resp = await deleteReg(User, id, "User");
    if (resp.deleted === 'ok') {
      showLog(`deleteUserHandler OK`);
      return res.status(200).json({ deleted: "ok" });
    } else {
      showLog(`deleteUserHandler ERROR-> ${resp.message}`);
      return res.status(404).send(resp.message);
    }
  } catch (err) {
    showLog(`deleteUserHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = deleteUserHandler;
