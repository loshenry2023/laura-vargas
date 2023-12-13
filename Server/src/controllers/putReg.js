// ! Modifica un registro en tabla.

const putReg = async (tableName, tableNameText, data, id) => {
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
            default:
        }
        return { "created": "ok" };
    } catch (err) {
        return { created: "error", message: err.message };
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