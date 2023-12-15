// ! Obtiene registros.
const showLog = require("../functions/showLog");

const getReg = async (
    tableName, tableNameText,
) => {
    try {
        let reg;
        switch (tableNameText) {
            case "Branch":
                reg = await tableName.findAll({
                    attributes: ["id", "branchName", "coordinates", "address", "phoneNumber", "openningHours", "clossingHours", "workingDays"],
                });
                break;
            case "Payment":
                reg = await tableName.findAll({
                    attributes: ["id", "paymentMethodName"],
                });
                break;
            case "Specialty":
                reg = await tableName.findAll({
                    attributes: ["id", "specialtyName"],
                });
                break;
            default:
                throw new Error("Tabla no válida");

        }
        return reg;
    } catch (err) {
        showLog(`getReg -> error: ${err.message}`);
        return err.message;
    }
}
module.exports = getReg;
