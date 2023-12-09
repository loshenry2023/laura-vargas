const getAllUsers = require("../../controllers/user/getAllUsers");

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
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "User not match" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = usersHandler;
