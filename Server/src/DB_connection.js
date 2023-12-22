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
const IncomingModel = require("../src/models/Incoming");
const CatGastosModel = require("../src/models/CatGastos");

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
IncomingModel(database);
CatGastosModel(database);

// Relacionar modelos:
const {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Calendar,
  Incoming,
  CatGastos,
} = database.models;

// Relaciones:
// belongsTo: establece una relación de pertenencia entre dos modelos, donde un modelo "pertenece a" otro.
// hasOne: establece una relación uno a uno entre dos modelos.
// hasMany: establece una relación uno a muchos entre dos modelos.
// belongsToMany: establece una relación muchos a muchos entre dos modelos.

//Calendar.belongsTo(Client, { foreignKey: "client_id" });
//Calendar.hasMany(Client, { foreignKey: "client_id" }); //un calendario puede tener muchos clientes agendados??!
//Client.belongsTo(Calendar); //un cliente pertenece a un solo calendario??!!
Client.hasMany(Calendar); //un cliente puede tener muchas citas agendadas
Client.hasMany(HistoryService); //un cliente puede tener muchos procedimientos hechos
User.belongsToMany(Specialty, { through: "user_specialty" }); // muchos usuarios pertenecen a muchas epecialidades
User.belongsToMany(Branch, { through: "user_branch" }); // muchos usuarios pertenecen a muchas sedes
Service.belongsToMany(Specialty, { through: "service_specialty" }); // muchos services pertenecen a muchas especialidades
Calendar.belongsTo(Service); // Un Calendar pertenece a un único service
Calendar.belongsTo(User); // Un Calendar pertenece a un único usuario
Calendar.belongsTo(Client); // Un Calendar pertenece a un único cliente
Calendar.belongsTo(Branch); // Un Calendar pertenece a una única sede

Incoming.belongsToMany(Payment, { through: "incoming_payment" }); // muchos ingresos pertenecen a muchos medios de pago
HistoryService.hasMany(Incoming); //un registro histórico puede tener muchos pagos hechos

module.exports = {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Calendar,
  Incoming,
  CatGastos,
  conn: database,
};
