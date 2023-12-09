const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("HistoryService", {
    id: {
      type: DataTypes.UUID, // clave impredecible, versión 4
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    imageServiceDone: {
      //imagen del servicio brindado
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    conformity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentMethodName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  });
};
