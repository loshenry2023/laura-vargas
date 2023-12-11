const { Branch } = require('../DB_connection');
const deleteReg = require("../controllers/deleteReg");
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');

const deleteBranchHandler = async (req, res) => {
  showLog(`deleteBranchHandler`);
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
    const resp = await deleteReg(Branch, id, "Branch");
    if (resp.deleted === 'ok') {
      showLog(`deleteBranchHandler OK`);
      return res.status(200).json({ deleted: "ok" });
    } else {
      showLog(`deleteBranchHandler ERROR-> ${resp.message}`);
      return res.status(404).send(resp.message);
    }
  } catch (err) {
    showLog(`deleteBranchHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = deleteBranchHandler;
