const { Branch } = require('../DB_connection');
const getReg = require("../controllers/getReg");
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');

const getBranchHandler = async (req, res) => {
  showLog(`getBranchHandler`);
  try {
    const { token } = req.query;
    // Verifico token:
    // if (!token) { throw Error("Token required"); }
    // const checked = await checkToken(token);
    // if (!checked.exist) {
    //     showLog(`Wrong token.`);
    //     return res.status(401).send(`Unauthorized.`);
    // }
    const resp = await getReg(Branch, "Branch");
    if (resp) {
      showLog(`getBranchHandler OK`);
      return res.status(200).json(resp);
    } else {
      showLog(`getBranchHandler ERROR-> Not found`);
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    showLog(`getBranchHandler ERROR-> ${err.message}`);
    return res.status(500).send(err.message);
  }
};

module.exports = getBranchHandler;
