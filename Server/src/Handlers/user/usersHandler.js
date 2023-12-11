const getAllUsers = require("../../controllers/user/getAllUsers");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const usersHandler = async (req, res) => {
  showLog(`usersHandler - Handler`);
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
      token,
    } = req.query;

    // Verifico token:
    // if (!token) { throw Error("Token required"); }
    // const checked = await checkToken(token);
    // if (!checked.exist) {
    //   showLog(`Wrong token.`);
    //   return res.status(401).send(`Unauthorized.`);
    // }

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

    if (users.count) {
      showLog(`usersHandler OK`);
      return res.status(200).json(users);
    } else {
      showLog(`usersHandler ERROR-> User not match`);
      return res.status(404).json({ message: "User not match" });
    }
  } catch (err) {
    showLog(`usersHandler ERROR-> ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = usersHandler;
