// ! Elimina un usuario.
const { User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { FIRST_SUPERADMIN } = require("../../functions/paramsEnv");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    showLog(`deleteUser ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        // Busco el usuario:
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) { throw Error("ID not found"); }
        if (userToDelete.userName === FIRST_SUPERADMIN) {
            throw Error("Not allowed");
        }
        // Elimino la relación con sede:
        await userToDelete.setBranch(null);
        // Elimino la relación con especialidades:
        await userToDelete.removeSpecialties();
        // Elimino el registro:
        await userToDelete.destroy();
        showLog(`deleteUser OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteUser;
