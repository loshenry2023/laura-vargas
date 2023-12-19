// ! Esta función crea los datos mínimos necesarios para que el sistema funcione:
// ! - 2 sedes,
// ! - 6 métodos de pago,
// ! - 5 especialidades,
// ! - 1 usuario superAdmin.
const { User, Branch, Payment, Specialty, Service } = require("../DB_connection");
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
      showLog(`... branches created`);
      // Crear los métodos de pago:
      const paymentList = ["Nequi", "DaviPlata", "Bancolombia", "efectivo", "banco de bogota", "wompi"];
      for (let i = 0; i < paymentList.length; i++) {
        const [paymentCreated, created] = await Payment.findOrCreate({
          where: {
            paymentMethodName: paymentList[i],
          },
        });
      }
      showLog(`... payments created`);
      // Crear las especialidades:
      const specialityList = ["Cejas", "Pestañas", "Labios", "Micropigmentación", "Lifting", "Administración"];
      let specCrtd;
      for (let i = 0; i < specialityList.length; i++) {
        const [specialityCreated, created] = await Specialty.findOrCreate({
          where: {
            specialtyName: specialityList[i],
          },
        });
        specCrtd = specialityCreated;
      }
      showLog(`... specialties created`);
      // Crear los procedimientos y sus relaciones:
      let serviceList;
      let spec;
      // Parte 1:
      serviceList = ["Micropigmentación", "Diseño y Depilación", "Diseño Depilación y henna", "Henna", "Laminado", "Retoque Micropigmentación", "Depilacion en las cejas"];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService: "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984759/cejas_nype4m.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Cejas" }
        });
        serviceCreated1.addSpecialty(spec)
      }
      // Parte 2:
      serviceList = ["Lifting", "Pestañas pelo a pelo", "Pestañas fibras tecnológicas", "Retoque pestañas pelo a pelo", "Retoque pestañas fibras tecnológicas", "Retiro de pestañas", "Pestañas Volumen express", "Pestañas Volumen ruso"];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService: "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984852/pesta_tuejpe.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Pestañas" }
        });
        serviceCreated1.addSpecialty(spec)
      }
      // Parte 3:
      serviceList = ["Micropigmentación", "Retoque Micropigmentación", "Depilación del bozo o bigote"];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService: "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984891/labios_ib7eet.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Labios" }
        });
        serviceCreated1.addSpecialty(spec)
      }
      showLog(`... services created`);
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
      let brnchCreated = await Branch.findAll({
        where: { branchName: "Restrepo" }
      });
      existingUserHenry.addBranch(brnchCreated)
      // Relación a especialidades:
      let specCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" }
      });
      existingUserHenry.addSpecialty(specCreated)
      showLog(`... main user created`);
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
      let brnchbCreated = await Branch.findAll({
        where: { branchName: "Villavicencio" }
      });
      existingUserHenrySec.addBranch(brnchbCreated)
      // Relación a especialidades:
      let specSecCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" }
      });
      existingUserHenrySec.addSpecialty(specSecCreated)
      showLog(`... second user created`);
      showLog(`Basic data created`);
    }
  } catch (error) {
    showLog(`Error creating basic data: ${error}`);
    throw Error("Error creando datos básicos: " + error);
  }
}

module.exports = createBasicData;