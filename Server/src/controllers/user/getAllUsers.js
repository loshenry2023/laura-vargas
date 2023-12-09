// ! Obtiene todos los usuarios. get all user
const axios = require("axios");
const { User, Specialty, Branch } = require("../../DB_connection");
const { Op } = require("sequelize");

const getAllUsers = async (
  nameOrLastName = "",
  attribute = "createdAt",
  order = "desc",
  page = 0,
  size = 4,
  branch = "",
  specialty = "",
  role = "",
  createDateEnd = "",
  createDateStart = ""
) => {
  const { count, rows } = await User.findAndCountAll({
  try {
    const { count, rows } = await User.findAndCountAll({
      include: [
        {
          model: Specialty,
          where: { specialtyName: { [Op.iLike]: `%${specialty}%` } },
          as: "Specialties",
          through: { attributes: [] },
          attributes: ["id", "specialtyName"],
        },
        {
          model: Branch,
          where: { branchName: { [Op.iLike]: `%${branch}%` } },
          attributes: ["id", "branchName"],
        },
      ],
      attributes: ["id", "name", "lastName", "userName", "role", "createdAt"],
      where: {
        [Op.or]: [
          //filtro por nombres
          { name: { [Op.iLike]: `%${nameOrLastName}%` } },
          { lastName: { [Op.iLike]: `%${nameOrLastName}%` } },
        ],
        role: role ? role : [`user`, `superAdmin`, `admin`],

        createdAt: {
          //para la fecha de creación
          [Op.gte]: createDateStart || "1900-01-01",
          [Op.lte]: createDateEnd || new Date(),
        },
      },

      order: [[attribute, order]],
      limit: size,
      offset: size * page,
    });
    return {
      count,
      rows,
    };
  } catch (err) {
    return { message: err.message };
  }
};
module.exports = getAllUsers;
