// ! Almacena un nuevo registro en tabla.
//const showLog = require("../functions/showLog");
const { Op } = require('sequelize');

const postReg = async (tableName, tableNameText, data, conn = "") => {
    try {
        let resp;
        switch (tableNameText) {
            case "Branch":
                resp = await AddRegBranch(tableName, data);
                return { "created": "ok" };
            case "Payment":
                resp = await AddRegPayment(tableName, data);
                return { "created": "ok" };
            case "Specialty":
                resp = await AddRegSpecialty(tableName, data);
                return { "created": "ok" };
            case "Service":
                resp = await AddRegService(tableName, data, conn);
                return { "created": "ok" };
            case "User":
                resp = await AddRegUser(tableName, data, conn);
                return { "created": "ok", "id": resp };
            case "Client":
                resp = await AddRegClient(tableName, data, conn);
                return { "created": "ok", "id": resp };
            default:
                throw new Error("Tabla no válida");
        }
    } catch (err) {
        return { created: "error", message: err.message };
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
        // PENDIENTE ANALIZAR RELACIONES antes del commit
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
        return;
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
        return;
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
        return;
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
        return;
    } catch (error) {
        throw Error(`${error}`);
    }
}

module.exports = postReg;