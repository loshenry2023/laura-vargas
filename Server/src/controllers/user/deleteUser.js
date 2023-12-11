// ! Elimina un usuario.
const { User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const { FIRST_SUPERADMIN } = require("../../functions/paramsEnv");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;
    showLog(`deleteUser ${id}`);
    try {
        // Verifico token. Sólo un superAdmin puede eliminar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!id) { throw Error("Data missing"); }
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) { throw Error("ID not found"); }
        if (userToDelete.userName === FIRST_SUPERADMIN) {
            throw Error("Not allowed");
        }
        // Elimino la relación con sede:
        await userToDelete.setBranch(null);
        // Elimino la relación con especialidades:
        await userToDelete.removeSpecialties();
        await userToDelete.destroy();
        showLog(`deleteUser OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteUser;
