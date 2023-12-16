// ! Esta función crea los datos mínimos necesarios para que el sistema funcione:
// ! - 2 sedes,
// ! - 6 métodos de pago,
// ! - 5 especialidades,
// ! - 1 usuario superAdmin.
const { User, Branch, Payment, Specialty } = require("../DB_connection");
const showLog = require("../functions/showLog");
const { FIRST_SUPERADMIN } = require("../functions/paramsEnv");

async function createBasicData() {
  try {
    // Hago una sola consulta que determina si es necesario agregar todos los datos básicos:
    const existingUsr = await User.findOne({
      where: { userName: FIRST_SUPERADMIN },
    });
    if (!existingUsr) {
      showLog(`First run. Adding basic data...`);
      const branchesList = [
        {
          branchName: "Villavicencio",
          address: "Calle 26 b num 39-34, Villavicencio, Colombia",
          phoneNumber: "+573502142355",
        },
        {
          branchName: "Restrepo",
          address: "CC Balcones Plaza, Local L29C, Restrepo, Meta, Colombia",
          phoneNumber: "+573502142355",
        }
      ]
      let branchCrtd;
      for (const branch of branchesList) {
        const [branchCreated, created] = await Branch.findOrCreate({
          where: {
            branchName: branch.branchName,
            address: branch.address,
            phoneNumber: branch.phoneNumber,
          },
        });
        branchCrtd = branchCreated;
        await sleep(2000); // Pausa de 2 segundos
      }
      // Crear los métodos de pago:
      const paymentList = ["Nequi", "DaviPlata", "Bancolombia", "efectivo", "banco de bogota", "wompi"];
      for (let i = 0; i < paymentList.length; i++) {
        const [paymentCreated, created] = await Payment.findOrCreate({
          where: {
            paymentMethodName: paymentList[i],
          },
        });
        await sleep(2000); // Pausa de 2 segundos
      }
      // Crear las especialidades:
      const specialityList = ["Cejas", "Pestañas", "Micropigmentación", "Lifting", "Administración"];
      let specCrtd;
      for (let i = 0; i < specialityList.length; i++) {
        const [specialityCreated, created] = await Specialty.findOrCreate({
          where: {
            specialtyName: specialityList[i],
          },
        });
        specCrtd = specialityCreated;
        await sleep(2000); // Pausa de 2 segundos
      }
      // Resto del código...

      showLog(`Basic data created`);
    }
  } catch (error) {
    showLog(`Error creating basic data: ${error}`);
    throw Error("Error creando datos básicos: " + error);
  }
}

// Función para pausar la ejecución durante un cierto tiempo
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = createBasicData;