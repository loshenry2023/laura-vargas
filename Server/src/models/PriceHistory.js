const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "PriceHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      codigo_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha_modificacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
    {
      paranoid: true, // Habilita eliminación suave
    }
  );
};
