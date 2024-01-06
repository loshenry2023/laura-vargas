const { DataTypes } = require("sequelize");

function extractBirthdayInfo(Client) {
  const fechaNacimiento = Client.birthday;
  if (fechaNacimiento) {
    Client.dayBirthday = fechaNacimiento.getDate();
    Client.monthBirthday = fechaNacimiento.getMonth() + 1; // Obtén el mes y suma 1 porque los meses en JavaScript son 0-indexados
  }
  return
}

module.exports = (sequelize) => {
  sequelize.define("Client", {
    id: {
      type: DataTypes.UUID, // clave impredecible, versión 4
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
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
    id_pers: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    birthday: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    monthBirthday: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dayBirthday: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    paranoid: true, // Habilita eliminación suave
  }, {
    hooks: {
      beforeCreate: (Client, options) => {
        extractBirthdayInfo(Client);
      },
      beforeUpdate: (Client, options) => {
        extractBirthdayInfo(Client);
      }
    }
  });
  
};