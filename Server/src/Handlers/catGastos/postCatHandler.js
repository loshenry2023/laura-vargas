const { CatGastos } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postCatHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`postCatHandler`);
    // Verifico token. Sólo un superAdmin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role !== "superAdmin") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(CatGastos, "CatGastos", req.body);
    if (resp.created === 'ok') {
      showLog(`postCatHandler OK`);
      return res.status(200).json({ "created": "ok", "id": resp.id });
    } else {
      showLog(`postCatHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postCatHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postCatHandler;

