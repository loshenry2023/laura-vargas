// ! Elimina una sede.
const { Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const deleteBranch = async (req, res) => {
    const { id } = req.params;
    showLog(`deleteBranch ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        // Busco por su ID:
        const branchToDelete = await Branch.findByPk(id);
        if (!branchToDelete) { throw Error("ID not found"); }
        // Elimino el registro. Es con marcado lógico:
        await branchToDelete.destroy();
        showLog(`deleteBranch OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteBranch ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteBranch;
