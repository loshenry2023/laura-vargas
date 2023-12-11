// ! Obtiene registros.
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');
const { FIRST_SUPERADMIN } = require("../functions/paramsEnv");

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
        }
        return reg;
    } catch (err) {
        showLog(`getReg -> error: ${err.message}`);
        return err.message;
    }
}
module.exports = getReg;
