//! Unico lugar donde obtengo las variables de entorno. Ya cambié el apiKey porque consumí los del mes.
require("dotenv").config();

const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "2108"; // mati usa 2108 - es
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || "lauravargas";
const SECURE = process.env.SECURE || false;
const MUST_LOG = process.env.MUST_LOG || 1;
const PORT = process.env.PORT || 3001;
const FIRST_SUPERADMIN =
  process.env.FIRST_SUPERADMIN || "loshenry2023@gmail.com";

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SECURE,
  PORT,
  MUST_LOG,
  FIRST_SUPERADMIN,
};
