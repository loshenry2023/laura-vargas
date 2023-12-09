// ! Elimina una esoecialidad.
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const deleteSpecialty = async (req, res) => {
    const { id } = req.params;
    showLog(`deleteSpecialty ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        // Busco por su ID:
        const specToDelete = await Specialty.findByPk(id);
        if (!specToDelete) { throw Error("ID not found"); }
        // Elimino el registro. Es con marcado lógico:
        specToDelete.active = "0";
        await specToDelete.save();
        showLog(`deleteSpecialty OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteSpecialty ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteSpecialty;
