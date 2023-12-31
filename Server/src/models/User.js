const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID, // clave impredecible, versión 4
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notificationEmail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneNumber1: {
      type: DataTypes.TEXT, //validar!
      allowNull: false,
    },
    phoneNumber2: {
      type: DataTypes.TEXT, //validar!
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comission: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("superAdmin", "admin", "especialista"),
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastUse: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    paranoid: true, // Habilita eliminación suave
  });
};