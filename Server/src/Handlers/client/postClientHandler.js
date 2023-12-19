const { conn, Client } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postClientHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`postClientHandler`);
    // Verifico token. Sólo un superAdmin o admin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role === "especialista") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(Client, "Client", req.body, conn);

    if (resp.created === 'ok') {
      showLog(`postClientHandler OK`);
      return res.status(200).json({ "created": "ok" });
    } else {
      showLog(`postClientHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postClientHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postClientHandler;

