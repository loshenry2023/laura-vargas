const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.UUID, // clave impredecible, versión 4
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      serviceName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ImageService: {
        //imagen del servicio a brindar
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.ENUM("1", "0"),
        allowNull: false,
      },

    },
    { timestamps: false }
  );
};
