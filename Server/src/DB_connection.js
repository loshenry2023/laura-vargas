require("pg"); // requerido por Vercel para el deploy
const { Sequelize } = require("sequelize");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SECURE,
} = require("./functions/paramsEnv");

// Definición de modelos:
const BranchModel = require("./models/Branch");
const ClientModel = require("../src/models/Client");
const HistoryServiceModel = require("../src/models/HistoryService");
const PaymentModel = require("../src/models/Payment");
const ServiceModel = require("../src/models/Service");
const SpecialtyModel = require("../src/models/Specialty");
const UserModel = require("../src/models/User");
const CalendarModel = require("../src/models/Calendar");

// Determino la conexión según el entorno:
let strConn = "";
if (SECURE) {
  // conexión segura (para BD remota):
  strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
} else {
  // conexión no segura (para BD local):
  strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const database = new Sequelize(strConn, { logging: false, native: false });
BranchModel(database);
ClientModel(database);
HistoryServiceModel(database);
PaymentModel(database);
ServiceModel(database);
SpecialtyModel(database);
UserModel(database);
CalendarModel(database);

// Relacionar modelos:
const {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Calendar
} = database.models;

//Relaciones a 1:
//Calendar.belongsTo(Client, { foreignKey: "client_id" });
Calendar.hasMany(Client, { foreignKey: "client_id" });
Client.belongsTo(Calendar);

//Relaciones a muchos:
User.belongsToMany(Specialty, { through: "user_specialty" });
User.belongsToMany(Branch, { through: "user_branch" });
// relaciones nuevas:
Service.belongsToMany(Specialty, { through: "service_specialty" });
Calendar.belongsToMany(Service, { through: "calendar_service" });

module.exports = {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Calendar,
  conn: database,
};
