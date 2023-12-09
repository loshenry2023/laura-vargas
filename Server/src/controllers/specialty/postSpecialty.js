// ! Almacena una nueva especialidad, si no es repetida.
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postSpecialty = async (req, res) => {
    const { specialtyName } = req.body;
    showLog(`postSpecialty`);
    try {
        if (!specialtyName) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con la misma especialidad:
        const specLowercase = specialtyName.toLowerCase();
        const existingSpec = await Specialty.findOne({
            where: { specialtyName: { [Op.iLike]: specLowercase } },
        });
        if (existingSpec) {
            showLog(`postSpecialty: ${specialtyName} already exists`);
            return res.status(409).send(`${specialtyName} already exists.`);
        }
        // Creo el registro si no existe:
        const [SpecCreated, created] = await Specialty.findOrCreate({
            where: { specialtyName },
        });
        showLog(`postSpecialty OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`postSpecialty ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postSpecialty;