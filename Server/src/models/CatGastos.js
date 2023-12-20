const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CatGastos",
    {
      id: {
        type: DataTypes.UUID, // clave impredecible, versión 4
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      catName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
    paranoid: true, // Habilita eliminación suave
  });
};