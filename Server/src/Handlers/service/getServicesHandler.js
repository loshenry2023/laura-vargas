const { Service, Specialty } = require('../../DB_connection');
const getReg = require("../../controllers/getReg");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getServicesHandler = async (req, res) => {
  try {
    const { token } = req.body;
    showLog(`getServicesHandler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const resp = await getReg(Service, "Service", Specialty);
    if (resp) {
      showLog(`getServicesHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getServicesHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getServicesHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getServicesHandler;

