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
const ProductModel = require("../src/models/Product");
const PriceHistoryModel = require("../src/models/PriceHistory");

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
ProductModel(database);
PriceHistoryModel(database);

// Relacionar modelos:
const {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Product,
  PriceHistory,
} = database.models;

//Relacion 1 a muchos esto es para el inventario:

Product.hasMany(PriceHistory, {
  foreignKey: "product_code", // Claveen la tabla PriceHistory
  sourceKey: "code", // Clave en la tabla Product
});

//Relaciones a muchos:
User.belongsToMany(Specialty, { through: "user_specialty" });
User.belongsToMany(Branch, { through: "user_branch" });
Service.belongsToMany(Branch, { through: "service_branch" });

module.exports = {
  Branch,
  Client,
  HistoryService,
  Payment,
  Service,
  Specialty,
  User,
  Product,
  PriceHistory,
  conn: database,
};
