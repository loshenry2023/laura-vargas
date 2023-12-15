// ! Obtiene todos los usuarios. Llamado desde el handler. Acá no se verifica token porque lo hace el handler.
const axios = require("axios");
const { User, Specialty, Branch } = require("../../DB_connection");
const { Op } = require("sequelize");
const showLog = require("../../functions/showLog");

const getAllUsers = async (
  nameOrLastName = "",
  attribute = "createdAt",
  order = "desc",
  page = 0,
  size = 10,
  branch = "",
  specialty = "",
  role = "",
  createDateEnd = "",
  createDateStart = ""
) => {
  // ! Recordatorio para verificar en el código: un usuario puede estar en más de una sede. Hice cambios a testear (Paulo)
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
          as: "Branches",
          through: { attributes: [] },
          attributes: ["id", "branchName"],
        },
        // Esta relación ya es obsoleta porque ahora es a muchos:
        // {
        //   model: Branch,
        //   where: { branchName: { [Op.iLike]: `%${branch}%` } },
        //   attributes: ["id", "branchName"],
        // },
      ],
      distinct: true,
      attributes: ["id", "name", "lastName", "userName", "role", "createdAt", "comission"],
      where: {
        [Op.or]: [
          //filtro por nombres
          { name: { [Op.iLike]: `%${nameOrLastName}%` } },
          { lastName: { [Op.iLike]: `%${nameOrLastName}%` } },
        ],
        role: role ? role : [`especialista`, `superAdmin`, `admin`],

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
    showLog(`usersHandler -> getAllUsers error: ${err.message}`);
    return { message: err.message };
  }
};

module.exports = getAllUsers;
