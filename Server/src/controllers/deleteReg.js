// ! Elimina un registro.

const showLog = require("../functions/showLog");
const { FIRST_SUPERADMIN } = require("../functions/paramsEnv");

const deleteReg = async (tableName, id, tableNameText) => {
    try {
        if (!id) { throw Error("Faltan datos"); }
        const regToDelete = await tableName.findByPk(id);
        if (!regToDelete) { throw Error("Registro no encontrado"); }
        if (tableNameText === "User") {
            if (regToDelete.userName === FIRST_SUPERADMIN) { throw Error("Sin permiso"); }
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
