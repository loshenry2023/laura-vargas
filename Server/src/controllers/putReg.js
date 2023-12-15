// ! Modifica un registro en tabla.
const { FIRST_SUPERADMIN } = require("../functions/paramsEnv");

const putReg = async (tableName, tableNameText, data, id, conn = "") => {
    try {
        let resp;
        switch (tableNameText) {
            case "Branch":
                resp = await editRegBranch(tableName, data, id);
                break;
            case "Payment":
                resp = await editRegPayment(tableName, data, id);
                break;
            case "Specialty":
                resp = await editRegSpecialty(tableName, data, id);
                break;
            case "User":
                resp = await editRegUser(tableName, data, id, conn);
                break;
            default:
        }
        return { "created": "ok" };
    } catch (err) {
        return { created: "error", message: err.message };
    }
}

async function editRegUser(User, data, id, conn) {
    const { name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = data;
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Faltan datos"); }
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            throw Error("Usuario no encontrado");
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        existingUser.name = name;
        existingUser.lastName = lastName;
        existingUser.notificationEmail = notificationEmail;
        existingUser.phoneNumber1 = phone1;
        existingUser.phoneNumber2 ? phone2 : "";
        existingUser.image = image;
        existingUser.comission = comission;
        if (existingUser.userName !== FIRST_SUPERADMIN) {
            existingUser.role = role;
        }
        await existingUser.save();
        // Busco las sedes para agregar las relaciones:
        await existingUser.setBranches(branch, { transaction });
        // Busco las especialidades para agregar las relaciones:
        await existingUser.setSpecialties(specialty, { transaction });
        await transaction.commit();
        return;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw Error(`${error}`);
    }
}

async function editRegBranch(Branch, data, id) {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = data;
    try {
        if (!branchName || !phoneNumber || !address) { throw Error("Faltan datos"); }
        const existingBranch = await Branch.findByPk(id);
        if (!existingBranch) {
            throw Error("Sede no encontrada");
        }
        existingBranch.branchName = branchName;
        existingBranch.coordinates = coordinates;
        existingBranch.address = address;
        existingBranch.phoneNumber = phoneNumber;
        existingBranch.openningHours = openningHours;
        existingBranch.clossingHours = clossingHours;
        existingBranch.workingDays = workingDays;
        await existingBranch.save();
        return;
    } catch (error) {
        throw Error(`${error}`);
    }
}

async function editRegPayment(Payment, data, id) {
    const { paymentMethodName } = data;
    try {
        if (!paymentMethodName) { throw Error("Faltan datos"); }
        const existingPay = await Payment.findByPk(id);
        if (!existingPay) {
            throw Error("Medio de pago no encontrado");
        }
        existingPay.paymentMethodName = paymentMethodName;
        await existingPay.save();
        return;
    } catch (error) {
        throw Error(`${error}`);
    }
}

async function editRegSpecialty(Specialty, data, id) {
    const { specialtyName } = data;
    try {
        if (!specialtyName) { throw Error("Faltan datos"); }
        const existingSpec = await Specialty.findByPk(id);
        if (!existingSpec) {
            throw Error("Especialidad no encontrada");
        }
        existingSpec.specialtyName = specialtyName;
        await existingSpec.save();
        return;
    } catch (error) {
        throw Error(`${error}`);
    }
}

module.exports = putReg;