// ! Almacena un nuevo registro en tabla.
//const showLog = require("../functions/showLog");
const { Op } = require('sequelize');
const showLog = require('../functions/showLog');

const postReg = async (tableName, tableNameText, data, conn = "", tableName2 = "", tableName3 = "", tableName4 = "", tableName5 = "") => {
    try {
        let resp;
        switch (tableNameText) {
            case "Branch":
                resp = await AddRegBranch(tableName, data);
                return { "created": "ok", "id": resp };
            case "Payment":
                resp = await AddRegPayment(tableName, data);
                return { "created": "ok", "id": resp };
            case "Specialty":
                resp = await AddRegSpecialty(tableName, data);
                return { "created": "ok", "id": resp };
            case "Service":
                resp = await AddRegService(tableName, data, conn);
                return { "created": "ok", "id": resp };
            case "Client":
                resp = await AddRegClient(tableName, data, conn);
                return { "created": "ok", "id": resp };
            case "User":
                resp = await AddRegUser(tableName, data, conn);
                return { "created": "ok", "id": resp };
            case "CatGastos":
                resp = await AddRegCatGastos(tableName, data);
                return { "created": "ok", "id": resp };
            case "HistoryService":
                resp = await AddRegHistoricProc(tableName, data, conn, tableName2, tableName3);
                return { "created": "ok" };
            case "Calendar":
                resp = await AddRegCalendar(tableName, data, conn, tableName2, tableName3, tableName4, tableName5);
                return { "created": "ok" };
            default:
                throw new Error("Tabla no válida");
        }
    } catch (err) {
        return { created: "error", message: err.message };
    }
}

async function AddRegCalendar(Calendar, data, conn, User, Service, Client, Branch) {
    const { idUser, idService, idClient, idBranch, date_from, date_to, obs } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!idUser || !idService || !idClient || !idBranch || !date_from || !date_to || !obs) { throw Error("Faltan datos"); }
        // Inicio la transacción:
        transaction = await conn.transaction();
        const regCreated = await Calendar.create({
            date_from, date_to, obs, current: true, BranchId: idBranch,
        }, { transaction });
        const user = await User.findByPk(idUser);
        if (!user) {
            throw Error("Usuario no encontrado");
        }
        await regCreated.setUser(user, { transaction });
        // Relación: Asocio el Calendar con el Service:
        const service = await Service.findByPk(idService);
        if (!service) {
            throw Error("Servicio no encontrado");
        }
        await regCreated.setService(service, { transaction });
        // Relación: Asocio el Calendar con el Client:
        const client = await Client.findByPk(idClient);
        if (!client) {
            throw Error("Cliente no encontrado");
        }
        await regCreated.setClient(client, { transaction });
        // Relación: Asocio el Calendar con la Branch:
        const branch = await Branch.findByPk(idBranch);
        if (!branch) {
            throw Error("Sede no encontrada");
        }
        await regCreated.setBranch(branch, { transaction });
        await transaction.commit();
        return;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function AddRegHistoricProc(HistoryService, data, conn, Client, Incoming) {
    const { idclient, imageServiceDone, date, amount1, amount2, conformity, branchName, paymentMethodName1, paymentMethodName2, serviceName, attendedBy, email, name, lastName, id_pers } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!idclient || !imageServiceDone || !date || !conformity || !branchName || !paymentMethodName1 || !paymentMethodName2 || !serviceName || !attendedBy || !email || !name || !lastName || !amount1 || !amount2) { throw Error("Faltan datos"); }
        // Inicio la transacción:
        transaction = await conn.transaction();
        const client = await Client.findByPk(idclient);
        if (!client) { throw Error("Cliente no encontrado"); }
        const regCreated = await HistoryService.create({
            imageServiceDone, date, conformity, branchName, serviceName, attendedBy, email, name, lastName, id_pers,
        }, { transaction });
        // Registro los dos posibles medios de pago:
        await Incoming.create({ amount: amount1, paymentMethodName: paymentMethodName1, DateIncoming: date, HistoryServiceId: regCreated.id }, { transaction });
        await Incoming.create({ amount: amount2, paymentMethodName: paymentMethodName2, DateIncoming: date, HistoryServiceId: regCreated.id }, { transaction });
        // Relación: asocio el historial de servicio con el cliente:
        await client.addHistoryService(regCreated, { transaction });
        await transaction.commit();
        return;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function AddRegClient(User, data, conn) {
    const { email, name, lastName, id_pers, phone1, phone2, image } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!email || !name || !lastName || !phone1 || !image) { throw Error("Faltan datos"); }
        const nameLowercase = name.toLowerCase();
        const lastNameLowercase = lastName.toLowerCase();
        const existingClient = await User.findOne({
            // no comparo con el id_pers (DNI) porque no es un dato obligatorio
            where: { name: { [Op.iLike]: nameLowercase }, lastName: { [Op.iLike]: lastNameLowercase }, email: email },
        });
        if (existingClient) {
            throw Error("El cliente ya existe");
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        const [ClientCreated, created] = await User.findOrCreate({
            where: { email, name, lastName, id_pers, phoneNumber1: phone1, phoneNumber2: phone2, image },
            transaction,
        });
        await transaction.commit();
        // Obtengo el id para devolver:
        const clientCreated = await User.findOne({
            where: { name: name, lastName: lastName, email: email },
        });
        return clientCreated.id;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function AddRegService(Service, data, conn) {
    const { serviceName, duration, price, ImageService, specialty } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!serviceName || !duration || !price || !ImageService || !specialty) { throw Error("Faltan datos"); }
        const svcLowercase = serviceName.toLowerCase();
        const existingSpec = await Service.findOne({
            where: { serviceName: { [Op.iLike]: svcLowercase } },
        });
        if (existingSpec) {
            throw Error("El procedimiento ya existe");
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        const [SvcCreated, created] = await Service.findOrCreate({
            where: { serviceName, duration, price, ImageService },
        });
        // Busco las especialidades para agregar las relaciones:
        for (const spec of specialty) {
            await SvcCreated.addSpecialties(spec, { transaction });
        }
        await transaction.commit();
        // Obtengo el id para devolver:
        const svcCreated = await Service.findOne({
            where: { serviceName: serviceName },
        });
        return svcCreated.id;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function AddRegUser(User, data, conn) {
    const { userName, name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!userName || !name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Faltan datos"); }
        const nameLowercase = userName.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (existingUser) {
            throw Error("El usuario ya existe");
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        const [UserCreated, created] = await User.findOrCreate({
            where: { userName, notificationEmail, name, lastName, phoneNumber1: phone1, phoneNumber2: phone2, image, comission, token: "", role },
            transaction,
        });
        // Busco las sedes para agregar las relaciones:
        for (const brnch of branch) {
            await UserCreated.addBranches(brnch, { transaction });
        }
        // Busco las especialidades para agregar las relaciones:
        for (const spec of specialty) {
            await UserCreated.addSpecialties(spec, { transaction });
        }
        await transaction.commit();
        // Obtengo el id para devolver:
        const userCreated = await User.findOne({
            where: { userName: userName },
        });
        return userCreated.id;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function AddRegBranch(Branch, data) {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = data;
    try {
        if (!branchName || !phoneNumber || !address) { throw Error("Faltan datos"); }
        const branchLowercase = branchName.toLowerCase();
        const existingBranch = await Branch.findOne({
            where: { branchName: { [Op.iLike]: branchLowercase } },
        });
        if (existingBranch) {
            throw Error("La sede ya existe");
        }
        const [BranchCreated, created] = await Branch.findOrCreate({
            where: { branchName, phoneNumber, address, coordinates, openningHours, clossingHours, workingDays },
        });
        // Obtengo el id para devolver:
        const branchCreated = await Branch.findOne({
            where: { branchName: branchName },
        });
        return branchCreated.id;
    } catch (error) {
        throw Error(`${error}`);
    }
}

async function AddRegPayment(Payment, data) {
    const { paymentMethodName } = data;
    try {
        if (!paymentMethodName) { throw Error("Faltan datos"); }
        const payLowercase = paymentMethodName.toLowerCase();
        const existingPayment = await Payment.findOne({
            where: { paymentMethodName: { [Op.iLike]: payLowercase } },
        });
        if (existingPayment) {
            throw Error("El medio de pago ya existe");
        }
        const [PayCreated, created] = await Payment.findOrCreate({
            where: { paymentMethodName },
        });
        // Obtengo el id para devolver:
        const payCreated = await Payment.findOne({
            where: { paymentMethodName: paymentMethodName },
        });
        return payCreated.id;
    } catch (error) {
        throw Error(`${error}`);
    }
}

async function AddRegSpecialty(Specialty, data) {
    const { specialtyName } = data;
    try {
        if (!specialtyName) { throw Error("Faltan datos"); }
        const specLowercase = specialtyName.toLowerCase();
        const existingSpec = await Specialty.findOne({
            where: { specialtyName: { [Op.iLike]: specLowercase } },
        });
        if (existingSpec) {
            throw Error("La especialidad ya existe");
        }
        const [SpecCreated, created] = await Specialty.findOrCreate({
            where: { specialtyName },
        });
        // Obtengo el id para devolver:
        const specCreated = await Specialty.findOne({
            where: { specialtyName: specialtyName },
        });
        return specCreated.id;
    } catch (error) {
        throw Error(`${error}`);
    }
}

async function AddRegCatGastos(CatGastos, data) {
    const { catName } = data;
    try {
        if (!catName) { throw Error("Faltan datos"); }
        const catLowercase = catName.toLowerCase();
        const existingCat = await CatGastos.findOne({
            where: { catName: { [Op.iLike]: catLowercase } },
        });
        if (existingCat) {
            throw Error("La categoría ya existe");
        }
        const [CatCreated, created] = await CatGastos.findOrCreate({
            where: { catName },
        });
        // Obtengo el id para devolver:
        const catCreated = await CatGastos.findOne({
            where: { catName: catName },
        });
        return catCreated.id;
    } catch (error) {
        throw Error(`${error}`);
    }
}

module.exports = postReg;