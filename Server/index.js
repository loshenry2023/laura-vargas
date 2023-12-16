const server = require("./src/app");
const showLog = require("./src/functions/showLog");
const { conn } = require("./src/DB_connection");
const { PORT, SECURE } = require("./src/functions/paramsEnv");
const createBasicData = require("./src/functions/createBasicData");

let conSegura = "";
SECURE ? (conSegura = "SECURE") : (conSegura = "NOT SECURE");

conn
  .authenticate()
  .then(() => {
    // La base de datos existe:
    return conn.sync({ alter: true });
  })
  .then(() => {
    // Antes de hacer el listen me encargo de verificar que existan los registros mínimos
    // de trabajo en las tablas:
    setTimeout(() => {
      createBasicData();
    }, 5000); // 5000 milisegundos = 5 segundos

    server.listen(PORT, () => {
      showLog(`Server running into ${PORT} Port. DB Connection: ${conSegura}`);
    });
  })
  .catch((err) => {
    showLog("Error connecting to the database (was it created?). Please check and restart");
  });