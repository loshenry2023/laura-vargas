// ! Esta función crea los datos mínimos necesarios para que el sistema funcione:
// ! - 2 sedes,
// ! - 6 métodos de pago,
// ! - 5 especialidades,
// ! - 5 categorías de gastos,
// ! - 18 procedimientos,
// ! - 1 usuario superAdmin.
// ! - 1 usuario admin (ELIMINAR AL ENTREGAR).
// ! - 1 usuario especialista (ELIMINAR AL ENTREGAR).
// ! - 1 cliente (ELIMINAR AL ENTREGAR).
// ! - 1 evento de calendario (ELIMINAR AL ENTREGAR).
// ! - 1 historial de atención (ELIMINAR AL ENTREGAR).
// ! - 10 productos en stock .
const {
  User,
  Branch,
  Payment,
  Specialty,
  Service,
  CatGastos,
  Calendar,
  HistoryService,
  Client,
  Incoming,
  Product,
} = require("../DB_connection");
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
      // TODO Creo las sedes:
      const branchesList = [
        {
          branchName: "Villavicencio",
          address: "Calle 26 b num 39-34, Villavicencio, Colombia",
          phoneNumber: "+573114928756",
          coordinates: "https://maps.app.goo.gl/urGxSpTtibWLYTsF8",
        },
        {
          branchName: "Restrepo",
          address: "CC Balcones Plaza, Local L29C, Restrepo, Meta, Colombia",
          phoneNumber: "+573502142355",
          coordinates: "https://maps.app.goo.gl/mjDcG7ZvJjjW6HzGA",
        },
      ];
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
      // TODO Creo los métodos de pago:
      const paymentList = [
        "Nequi",
        "DaviPlata",
        "Bancolombia",
        "efectivo",
        "banco de bogota",
        "wompi",
      ];
      for (let i = 0; i < paymentList.length; i++) {
        const [paymentCreated, created] = await Payment.findOrCreate({
          where: {
            paymentMethodName: paymentList[i],
          },
        });
      }
      showLog(`... payments created`);
      // TODO Creo las especialidades:
      const specialityList = [
        "Cejas",
        "Pestañas",
        "Labios",
        "Micropigmentación",
        "Lifting",
        "Administración",
      ];
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
      // TODO Creo las categorías de gastos:
      const catList = [
        "Comisiones",
        "Personal",
        "Salario",
        "Insumos",
        "Arriendos",
      ];
      let catCrtd;
      for (let i = 0; i < catList.length; i++) {
        const [catCreated, created] = await CatGastos.findOrCreate({
          where: {
            catName: catList[i],
          },
        });
        catCrtd = catCreated;
      }
      showLog(`... expense categories created`);
      // TODO Creo los procedimientos y sus relaciones:
      let serviceList;
      let spec;
      // Parte 1:
      serviceList = [
        "Micropigmentación cejas",
        "Diseño y Depilación",
        "Diseño Depilación y henna",
        "Henna",
        "Laminado",
        "Retoque Micropigmentación cejas",
        "Depilacion en las cejas",
      ];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService:
              "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984759/cejas_nype4m.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Cejas" },
        });
        serviceCreated1.addSpecialty(spec);
      }
      // Parte 2:
      serviceList = [
        "Lifting",
        "Pestañas pelo a pelo",
        "Pestañas fibras tecnológicas",
        "Retoque pestañas pelo a pelo",
        "Retoque pestañas fibras tecnológicas",
        "Retiro de pestañas",
        "Pestañas Volumen express",
        "Pestañas Volumen ruso",
      ];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService:
              "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984852/pesta_tuejpe.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Pestañas" },
        });
        serviceCreated1.addSpecialty(spec);
      }
      // Parte 3:
      serviceList = [
        "Micropigmentación labios",
        "Retoque Micropigmentación labios",
        "Depilación del bozo o bigote",
      ];
      for (let i = 0; i < serviceList.length; i++) {
        const [serviceCreated1, created] = await Service.findOrCreate({
          where: {
            serviceName: serviceList[i],
            duration: 30,
            price: 0,
            ImageService:
              "https://res.cloudinary.com/ddlwjsfml/image/upload/v1702984891/labios_ib7eet.jpg",
          },
        });
        spec = await Specialty.findAll({
          where: { specialtyName: "Labios" },
        });
        serviceCreated1.addSpecialty(spec);
      }
      showLog(`... services created`);
      // TODO Creo un cliente:
      const regCreated = await Client.create({
        email: "pepito@gmail.com",
        name: "Pepe",
        lastName: "Parada",
        id_pers: "20093344",
        phoneNumber1: "55555555",
        phoneNumber2: "44444444",
        image:
          "https://res.cloudinary.com/ddlwjsfml/image/upload/v1703085714/IMG-20230530-WA0053_w4tdnm.jpg",
      });
      showLog(`... client created`);
      // TODO Creo el usuario inicial:
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
        where: { branchName: "Restrepo" },
      });
      existingUserHenry.addBranch(brnchCreated);
      // Relación a especialidades:
      let specCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" },
      });
      existingUserHenry.addSpecialty(specCreated);
      showLog(`... superAdmin user created`);
      // TODO Creo un usuario admin para pruebas de desarrollo. ESTE USUARIO SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
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
        where: { branchName: "Villavicencio" },
      });
      existingUserHenrySec.addBranch(brnchbCreated);
      // Relación a especialidades:
      let specSecCreated = await Specialty.findAll({
        where: { specialtyName: "Administración" },
      });
      existingUserHenrySec.addSpecialty(specSecCreated);
      showLog(`... admin user created`);
      // TODO Creo un usuario especialista para pruebas de desarrollo. ESTE USUARIO SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
      const [existingUserHenryEsp, userEspCreated] = await User.findOrCreate({
        where: {
          userName: "juan.jose@gmail.com",
          notificationEmail: "juan.jose@gmail.com",
          name: "Juan",
          lastName: "José",
          phoneNumber1: "55555555",
          image:
            "https://res.cloudinary.com/ddlwjsfml/image/upload/v1703087325/Vana_Studio_-_dressed_in_summer_clothes_enjoying_a_snow_day_with_computers_1_nbjp5n.png",
          comission: 30,
          role: "especialista",
        },
      });
      // Relación a sedes:
      let brnchcCreated = await Branch.findAll({
        where: { branchName: "Villavicencio" },
      });
      existingUserHenryEsp.addBranch(brnchcCreated);
      // Relación a especialidades:
      let specEspCreated = await Specialty.findAll({
        where: { specialtyName: "Labios" },
      });
      existingUserHenryEsp.addSpecialty(specEspCreated);
      showLog(`... especialista user created`);
      // TODO Creo una cita en el calendario. SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
      const branch = await Branch.findOne({
        where: { branchName: "Villavicencio" },
      });
      const appointCreated = await Calendar.create({
        date_from: "2023-12-26 08:00:00",
        date_to: "2023-12-26 08:50:00",
        obs: "Tener en cuenta que es un paciente delicado",
        current: true,
        BranchId: branch.id,
        reminded: false,
      });
      //Relaciones:
      const user = await User.findOne({
        where: { userName: "juan.jose@gmail.com" },
      });
      await appointCreated.setUser(user);
      const service = await Service.findOne({
        where: { serviceName: "Micropigmentación" },
      });
      await appointCreated.setService(service);
      const client = await Client.findOne({
        where: { email: "pepito@gmail.com" },
      });
      await appointCreated.setClient(client);
      // Relación: Asocio el Calendar con la Branch:
      await appointCreated.setBranch(branch);
      showLog(`... appointment created`);
      // TODO Creo un registro de atención en el histórico. SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
      const historCreated = await HistoryService.create({
        imageServiceDone:
          "https://res.cloudinary.com/ddlwjsfml/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1702984759/cejas_nype4m.jpg",
        date: "2023-12-25 11:37:00",
        conformity:
          "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        serviceName: "Laminado",
        attendedBy: "Juan José",
        email: "pepito@gmail.com",
        name: "Pepe",
        lastName: "Parada",
        id_pers: "20093344",
        idUser: user.id,
      });
      // Registro los dos posibles medios de pago:
      await Incoming.create({
        amount: "50000",
        paymentMethodName: "DaviPlata",
        DateIncoming: "2023-12-25 11:37:00",
        HistoryServiceId: historCreated.id,
      });
      await Incoming.create({
        amount: "25000",
        paymentMethodName: "efectivo",
        DateIncoming: "2023-12-25 11:37:00",
        HistoryServiceId: historCreated.id,
      });
      // Relación: asocio el historial de servicio con el cliente:
      await client.addHistoryService(historCreated);
      showLog(`... received log created.`);
      // TODO Creo un registro de atención en el histórico. SE DEBE ELIMINAR AL FINALIZAR EL DESARROLLO!!!!!:
      const productList = [
        {
          productCode: "1",
          productName: "Aplicadores",
          description: "Aplicadores",
          supplier: "FUCSIA INSUMOS",
          amount: 8,
        },
        {
          productCode: "2",
          productName: "Volumen Egipcio",
          description: "Pestañas Nagaraku W 8mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "3",
          productName: "Volumen Egipcio",
          description: "Pestañas Beauty Plus W 10mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "4",
          productName: "Volumen Egipcio",
          description: "Pestañas Beauty Plus W 11mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "5",
          productName: "Volumen Egipcio",
          description: "Pestañas Beauty Plus W 12mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "6",
          productName: "Volumen Egipcio",
          description: "Pestañas Beauty Plus W 13mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "7",
          productName: "Volumen Egipcio",
          description: "Pestañas Nagaraku W 9mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "8",
          productName: "Volumen Egipcio",
          description: "Pestañas Nagaraku W 13MM 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 2,
        },
        {
          productCode: "9",
          productName: "Volumen Egipcio",
          description: "Pestañas Beauty PLUS W 14mm 0.07D",
          supplier: "FUCSIA INSUMOS",
          amount: 1,
        },
        {
          productCode: "10",
          productName: "Volumen Egipcio",
          description: "Pestañas Nagaraku W 14mm 0.07d",
          supplier: "FUCSIA INSUMOS",
          amount: 2,
        },
      ];

      let productosCreados = 0;

      for (const productData of productList) {
        const randomPrice = Math.floor(Math.random() * 100) + 1;
        const [productCreated, created] = await Product.findOrCreate({
          where: {
            productCode: productData.productCode,
          },
          defaults: {
            productCode: productData.productCode,
            productName: productData.productName,
            description: productData.description,
            supplier: productData.supplier,
            amount: productData.amount,
          },
        });

        if (created) {
          productosCreados++;
          await productCreated.createPriceHistory({
            price: randomPrice,
          });

          //villavicencio y restrepo van aleatorios porque no sabemos cual es
          const randomNumber = Math.random();
          let branchName;

          if (randomNumber < 0.5) {
            branchName = "Villavicencio";
          } else {
            branchName = "Restrepo";
          }

          const branch = await Branch.findOne({
            where: { branchName },
          });

          if (branch) {
            await productCreated.setBranch(branch);
          } else {
            //showLog(`No se encontró la sucursal`);
          }
        } else {
          //showLog(`Producto con código ${productData.code} ya existe`);
        }
      }
      showLog(`... ${productosCreados} products created. Basic data created.`);
    }
  } catch (error) {
    showLog(`Error creating basic data: ${error}`);
    throw Error("Error creando datos básicos: " + error);
  }
}

module.exports = createBasicData;
