const { conn, Calendar, User, Service, Client, Branch } = require('../../DB_connection');
const postReg = require("../../controllers/postReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const postCalendarHandler = async (req, res) => {
  console.log(req.body)
  try {
    const { token } = req.body;
    showLog(`postCalendarHandler`);
    // Verifico token. Sólo un superAdmin o admin puede agregar:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist || checked.role === "especialista") {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await postReg(Calendar, "Calendar", req.body, conn, User, Service, Client, Branch);
    if (resp.created === 'ok') {
      showLog(`postCalendarHandler OK`);
      return res.status(200).json({ "created": "ok" });
    } else {
      showLog(`postCalendarHandler ERROR-> ${resp.message}`);
      return res.status(500).send(resp.message);
    }
  } catch (err) {
    showLog(`postCalendarHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = postCalendarHandler;

