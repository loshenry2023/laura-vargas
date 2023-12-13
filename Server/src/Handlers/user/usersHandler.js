const getAllUsers = require("../../controllers/user/getAllUsers");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const usersHandler = async (req, res) => {
  try {
    const {
      nameOrLastName,
      attribute,
      order,
      page,
      size,
      branch,
      specialty,
      role,
      createDateEnd,
      createDateStart,
    } = req.query;
    const { token } = req.body;
    showLog(`usersHandler - Handler`);
    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(`Wrong token.`);
      return res.status(401).send(`Sin permiso.`);
    }
    const users = await getAllUsers(
      nameOrLastName,
      attribute,
      order,
      page,
      size,
      branch,
      specialty,
      role,
      createDateEnd,
      createDateStart
    );
    showLog(`getUserData OK`);
    return res.status(200).json(users);
  } catch (err) {
    showLog(`getUserData ERROR-> ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = usersHandler;
