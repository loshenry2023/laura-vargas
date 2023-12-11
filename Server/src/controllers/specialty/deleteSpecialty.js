// ! Elimina una esoecialidad.
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const deleteSpecialty = async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;
    showLog(`deleteSpecialty ${id}`);
    try {
        // Verifico token. Sólo un admin puede eliminar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "admin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!id) { throw Error("Data missing"); }
        const specToDelete = await Specialty.findByPk(id);
        if (!specToDelete) { throw Error("ID not found"); }
        await specToDelete.destroy();
        showLog(`deleteSpecialty OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteSpecialty ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteSpecialty;
