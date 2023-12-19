// ! Obtiene registros.
const showLog = require("../functions/showLog");

const getReg = async (
    tableName, tableNameText, tableName2 = "", tableName3 = "", tableName4 = "", tableName5 = "",
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
                            attributes: ['id', 'date', 'serviceName', 'imageServiceDone', 'conformity', 'branchName', 'attendedBy'],
                        },
                    ],
                });
                break;
            case "HistoryService":
                reg = await tableName.findAll({
                    attributes: ["id", "imageServiceDone", "date", "conformity", "branchName", "serviceName", "attendedBy", "email", "name", "lastName", "id_pers"],
                    include: [
                        { // incoming
                            model: tableName2,
                            attributes: ["id", "amount", "DateIncoming", "paymentMethodName"],
                        },
                    ],
                });
                break;
            case "Calendar":
                reg = await tableName.findAll({
                    attributes: ["id", "date_from", "date_to", "obs", "current"],
                    include: [
                        { // user
                            model: tableName2,
                            attributes: ["id", "userName", "name", "lastName"],
                        },
                        { // Service
                            model: tableName3,
                            attributes: ["id", "serviceName", "duration", "price", "ImageService"],
                        },
                        { // Client
                            model: tableName4,
                            attributes: ["id", "email", "name", "lastName", "id_pers", "phoneNumber1", "phoneNumber2", "image"],
                        },
                        { // Branch
                            model: tableName5,
                            attributes: ["id", "branchName"],
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
