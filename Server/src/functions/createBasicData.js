// ! Esta función crea los datos mínimos necesarios para que el sistema funcione:
// ! - 2 sedes,
// ! - 6 métodos de pago,
// ! - 5 especialidades,
// ! - 1 usuario superAdmin.

const { User, Branch, Payment, Specialty } = require("../DB_connection");
const showLog = require("../functions/showLog");

async function createBasicData() {
  try {
    // Hago una sola consulta que determina si es necesario agregar todos los datos básicos:
    const existingUsr = await User.findOne({
      where: { userName: "loshenry2023@gmail.com" },
    });
    if (!existingUsr) {
      showLog(`First run. Adding basic data...`);
      const branchesList = [
        {
          branchName: "Villavicencio",
          address: "Calle 26 b num 39-34, Villavicencio, Colombia",
          phoneNumber: "+573502142355",
          active: "1",
        },
        {
          branchName: "Restrepo",
          address: "CC Balcones Plaza, Local L29C, Restrepo, Meta, Colombia",
          phoneNumber: "+573502142355",
          active: "1",
        }
      ]
      let branchCrtd;
      for (const branch of branchesList) {
        const [branchCreated, created] = await Branch.findOrCreate({
          where: {
            branchName: branch.branchName,
            address: branch.address,
            phoneNumber: branch.phoneNumber,
            active: branch.active,
          },
        });
        branchCrtd = branchCreated;
      }
      // Crear los métodos de pago:
      const paymentList = ["Nequi", "DaviPlata", "Bancolombia", "efectivo", "banco de bogota", "wompi"];
      for (let i = 0; i < paymentList.length; i++) {
        const [paymentCreated, created] = await Payment.findOrCreate({
          where: {
            PaymentMethodName: paymentList[i],
            active: "1",
          },
        });
      }
      // Crear las especialidades:
      const specialityList = ["Cejas", "Pestañas", "Micropigmentación", "Lifting", "Administración"];
      for (let i = 0; i < specialityList.length; i++) {
        const [specialityCreated, created] = await Specialty.findOrCreate({
          where: {
            specialtyName: specialityList[i],
            active: "1",
          },
        });
      }
      // Crear el usuario inicial:
      const [existingUserHenry, userCreated] = await User.findOrCreate({
        where: {
          userName: "loshenry2023@gmail.com",
          notificationEmail: "loshenry2023@gmail.com",
          name: "Henry",
          lastName: "2023",
          phoneNumber1: "111111111",
          image:
            "https://res.cloudinary.com/dvptbowso/image/upload/v1701979529/HenryPF/ses9qbgrnytwd9l1ovcu.png",
          comission: 0,
          role: "superAdmin",
          active: "1",
        },
      });
      // Relación:
      await existingUserHenry.setBranch(branchCrtd);
      showLog(`Basic data created`);
    }
  } catch (error) {
    showLog(`Error creating basic data: ${error}`);
    throw error;
  }
}

module.exports = createBasicData;