// ! Elimina un usuario.
const { User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    showLog(`deleteUser ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        // Busco el usuario por su ID:
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) { throw Error("ID not found"); }
        //        showLog(`userToDelete.userName: ${userToDelete.userName}`);
        if (userToDelete.userName === "loshenry2023@gmail.com") {
            throw Error("Not allowed");
        }
        // Elimino el usuario. Es con marcado lógico:
        userToDelete.active = "0";
        await userToDelete.save();
        showLog(`deleteUser OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteUser;
