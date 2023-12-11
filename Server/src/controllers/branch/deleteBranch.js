// ! Elimina una sede.
const { Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const deleteBranch = async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;
    showLog(`deleteBranch ${id}`);
    try {
        // Verifico token. Sólo un superAdmin puede eliminar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!id) { throw Error("Data missing"); }
        const branchToDelete = await Branch.findByPk(id);
        if (!branchToDelete) { throw Error("ID not found"); }
        await branchToDelete.destroy();
        showLog(`deleteBranch OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteBranch ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteBranch;
