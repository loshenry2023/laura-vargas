const getAllUsers = require("../../controllers/user/getAllUsers");
const showLog = require("../../functions/showLog");

const usersHandler = async (req, res) => {
  showLog(`GetAllUsers - Handler`);
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
      showLog(`getUserData OK`);
      return res.status(200).json(users);
    } else {
      showLog(`getUserData ERROR-> User not match`);
      return res.status(404).json({ message: "User not match" });
    }
  } catch (err) {
    showLog(`getUserData ERROR-> ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = usersHandler;
