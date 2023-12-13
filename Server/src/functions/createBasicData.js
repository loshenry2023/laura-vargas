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
      }
      // Crear los métodos de pago:
      const paymentList = ["Nequi", "DaviPlata", "Bancolombia", "efectivo", "banco de bogota", "wompi"];
      for (let i = 0; i < paymentList.length; i++) {
        const [paymentCreated, created] = await Payment.findOrCreate({
          where: {
            paymentMethodName: paymentList[i],
          },
        });
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
      }
      // Crear el usuario inicial:
      const [existingUserHenry, userCreated] = await User.findOrCreate({
        where: {
          userName: FIRST_SUPERADMIN,
          notificationEmail: FIRST_SUPERADMIN,
          name: "Usuario",
          lastName: "Inicial",
          phoneNumber1: "111111111",
          image:
            "https://res.cloudinary.com/dvptbowso/image/upload/v1701979529/HenryPF/ses9qbgrnytwd9l1ovcu.png",
          comission: 0,
          role: "superAdmin",
        },
      });
      // Relación a sedes:
      await existingUserHenry.setBranch(branchCrtd);
      // Relación a especialidades:
      let specCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" }
      });
      existingUserHenry.addSpecialty(specCreated)
      // Crear un usuario secundario para pruebas de desarrollo. ESTE USUARIO SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
      const [existingUserHenrySec, userSecCreated] = await User.findOrCreate({
        where: {
          userName: "tomas.bombau@gmail.com",
          notificationEmail: "tomas.bombau@gmail.com",
          name: "Tomas",
          lastName: "Bombau",
          phoneNumber1: "55555555",
          image:
            "https://res.cloudinary.com/dvptbowso/image/upload/v1699463369/PI_Videogames/ImgNav_s1visa.png",
          comission: 40,
          role: "admin",
        },
      });
      // Relación a sedes:
      await existingUserHenrySec.setBranch(branchCrtd);
      // Relación a especialidades:
      let specSecCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" }
      });
      existingUserHenrySec.addSpecialty(specSecCreated)

      showLog(`Basic data created`);
    }
  } catch (error) {
    showLog(`Error creating basic data: ${error}`);
    throw Error("Error creando datos básicos: " + error);
  }
}

module.exports = createBasicData;