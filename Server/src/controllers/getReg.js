// ! Obtiene registros.
const showLog = require("../functions/showLog");

const getReg = async (
    tableName, tableNameText, tableName2 = "", tableName3 = "",
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
            case "Client":
                reg = await tableName.findAll({
                    attributes: ["id", "email", "name", "lastName", "id_pers", "phoneNumber1", "phoneNumber2", "image"],
                    include: [
                        {
                            model: tableName2,
                            attributes: ['id', 'date_from', 'date_to', 'obs'],
                        },
                        {
                            model: tableName3,
                            attributes: ['id', 'date', 'serviceName', 'price', 'imageServiceDone', 'conformity', 'branchName', 'paymentMethodName', 'attendedBy'],
                        },
                    ],
                });
                break;
            case "HistoryService":
                reg = await tableName.findAll({
                    attributes: ["id", "imageServiceDone", "date", "price", "conformity", "branchName", "paymentMethodName", "serviceName", "attendedBy", "email", "name", "lastName", "id_pers"],
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
