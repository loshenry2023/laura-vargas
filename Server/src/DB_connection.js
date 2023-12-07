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
const SedeModel = require("../src/models/Sede");
const ClientModel = require("../src/models/Client");
const HistoryServiceModel = require("../src/models/HistoryService");
const PaymentModel = require("../src/models/Payment");
const ServiceModel = require("../src/models/Service");
const SpecialtyModel = require("../src/models/Specialty");
const StatusModel = require("../src/models/Status");
const UserModel = require("../src/models/User");

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
SedeModel(database);
ClientModel(database);
HistoryServiceModel(database);
PaymentModel(database);
ServiceModel(database);
SpecialtyModel(database);
StatusModel(database);
UserModel(database);

// Relacionar modelos:

const {
  Sede,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  Status,
  User,
} = database.models;

Payment.belongsTo(Status, { foreignKey: "status_id" });
Sede.belongsTo(User, { foreignKey: "user_id" });
Client.belongsTo(Status, { foreignKey: "status_id" });
Sede.belongsTo(Status, { foreignKey: "status_id" });
User.belongsTo(Status, { foreignKey: "status_id" });
Service.belongsTo(Status, { foreignKey: "status_id" });
HistoryService.belongsTo(Sede, { foreignKey: "sede_id" });

User.belongsToMany(Specialty, { through: "user_specialty" });
Service.belongsToMany(Sede, { through: "sede_id" });
HistoryService.belongsToMany(Payment, { through: "history_service_payment" });
HistoryService.belongsToMany(Service, { through: "history_service_service" });

module.exports = {
  Sede,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  Status,
  User,
  conn: database,
};
