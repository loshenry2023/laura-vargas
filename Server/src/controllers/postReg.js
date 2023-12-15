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
            case "User":
                resp = await AddRegUser(tableName, data, conn);
                return { "created": "ok", "id": resp };
            default:
                throw new Error("Tabla no válida");
        }
    } catch (err) {
        return { created: "error", message: err.message };
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

        // Obtengo el id para revolver:
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