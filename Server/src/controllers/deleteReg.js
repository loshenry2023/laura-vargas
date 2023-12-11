// ! Elimina un registro.
const showLog = require("../functions/showLog");
const checkToken = require('../functions/checkToken');
const { FIRST_SUPERADMIN } = require("../functions/paramsEnv");

const deleteReg = async (tableName, id, tableNameText) => {
    try {
        if (!id) { throw Error("Data missing"); }
        const regToDelete = await tableName.findByPk(id);
        if (!regToDelete) { throw Error("ID not found"); }
        if (tableNameText === "User") {
            if (regToDelete.userName === FIRST_SUPERADMIN) { throw Error("Not allowed"); }
            // Elimino la relación con sede:
            await regToDelete.setBranch(null);
            // Elimino la relación con especialidades:
            await regToDelete.removeSpecialties();
        }
        await regToDelete.destroy();
        return { "deleted": "ok" };
    } catch (err) {
        showLog(`deleteReg -> error: ${err.message}`);
        return { deleted: "error", message: err.message };
    }
}
module.exports = deleteReg;
