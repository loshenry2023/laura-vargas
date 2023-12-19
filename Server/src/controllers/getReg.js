// ! Obtiene registros.
const showLog = require("../functions/showLog");

const getReg = async (
    tableName, tableNameText, tableName2 = "",
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
            case "Service":
                reg = await tableName.findAll({
                    attributes: ["id", "serviceName", "duration", "price", "ImageService"],
                    include: [
                        {
                            model: tableName2,
                            as: 'Specialties',
                            attributes: ['id', 'specialtyName'],
                            through: { attributes: [] }
                        },
                    ],
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
