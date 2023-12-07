const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Status",
    {
      id: {
        type: DataTypes.UUID, // clave impredecible, versión 4
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
