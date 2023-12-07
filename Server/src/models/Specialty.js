const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Specialty",
    {
      id: {
        type: DataTypes.UUID, // clave impredecible, versión 4
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      specialtyName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
