const server = require("./src/app");
const showLog = require("./src/functions/showLog");
const { conn } = require("./src/DB_connection");
const { PORT, SECURE } = require("./src/functions/paramsEnv");
const createBasicData = require("./src/functions/createBasicData");
const { transporter } = require("./src/nodemailer")

let conSegura = "";
SECURE ? (conSegura = "SECURE") : (conSegura = "NOT SECURE");

(async () => {
  try {
    await conn.authenticate();
    await conn.sync({ alter: true });
    // Verifico que existan los registros mínimos antes de iniciar el servidor:
    await createBasicData();
    const serverInstance = server.listen(PORT, () => {
      showLog(`Server running into ${PORT} Port. DB Connection: ${conSegura}`);
    });
    serverInstance.on("listening", async () => {
      try {
        await transporter.verify();
        showLog(`Email service running`);
      } catch (err) {
        showLog(`Email server: error verifying email transporter: ${err}`);
      }
    });
  } catch (err) {
    showLog("Error connecting to the database (was it created?). Please check and restart");
  }
})();
