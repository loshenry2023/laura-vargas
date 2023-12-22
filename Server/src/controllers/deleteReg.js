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
            // Elimino la relación con sedes:
            await regToDelete.removeBranches();
            // Elimino la relación con especialidades:
            await regToDelete.removeSpecialties();
        }
        if (tableNameText === "Service") {
            // Elimino la relación con especialidades:
            await regToDelete.removeSpecialties();
        }
        if (tableNameText === "Client") {
            // Elimino la relación con el calendario:
            const calendars = await regToDelete.getCalendars();
            if (calendars && calendars.length > 0) {
                // Elimino la relación con calendarios
                await regToDelete.setCalendars(null);
            }
        }
        if (tableNameText === "Calendar") {
            // Elimino la relación con el usuario:
            const users = await regToDelete.getUser();
            if (users && users.length > 0) {
                await regToDelete.setUsers(null);
            }
            // Elimino la relación con el cliente:
            const clients = await regToDelete.getClient();
            if (clients && clients.length > 0) {
                await regToDelete.setClient(null);
            }
            // Elimino la relación con el procedimiento:
            const proc = await regToDelete.getService();
            if (proc && proc.length > 0) {
                await regToDelete.setService(null);
            }
            // Elimino la relación con la sede:
            const branch = await regToDelete.getBranch();
            if (branch && branch.length > 0) {
                await regToDelete.setBranch(null);
            }
        }
        await regToDelete.destroy();
        return { "deleted": "ok" };
    } catch (err) {
        showLog(`deleteReg -> error: ${err.message}`);
        return { deleted: "error", message: err.message };
    }
}
module.exports = deleteReg;
