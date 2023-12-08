// ! Edita una especialidad.
const { Specialty } = require('../../DB_connection');
const showLog = require('../../functions/showLog');

const putSpeciality = async (req, res) => {
    const { specialtyName } = req.body;
    const { id } = req.params;
    showLog('putSpeciality');
    try {
        if (!specialtyName || !id) { throw Error("Data missing"); }
        const existingSpec = await Specialty.findByPk(id);
        if (!existingSpec) {
            showLog(`putSpeciality: ${specialtyName} not found.`);
            return res.status(404).send(`${specialtyName} not found.`);
        }
        // Actualizo los campos:
        existingSpec.specialtyName = specialtyName;
        await existingSpec.save();
        showLog('putSpeciality OK');
        return res.status(200).json({ updated: 'ok' });
    } catch (err) {
        showLog(`putSpeciality ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putSpeciality;