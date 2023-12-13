// ! Almacena un nuevo registro en tabla.

const { Op } = require('sequelize');

const postReg = async (tableName, tableNameText, data) => {
    try {
        let resp;
        switch (tableNameText) {
            case "Branch":
                resp = await AddRegBranch(tableName, data);
                break;
            case "Payment":
                resp = await AddRegPayment(tableName, data);
                break;
            case "Specialty":
                resp = await AddRegSpecialty(tableName, data);
                break;
            default:
        }
        return { "created": "ok" };
    } catch (err) {
        return { created: "error", message: err.message };
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