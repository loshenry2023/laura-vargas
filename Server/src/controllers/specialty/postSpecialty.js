// ! Almacena una nueva especialidad, si no es repetida.
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const { Op } = require('sequelize');

const postSpecialty = async (req, res) => {
    const { specialtyName } = req.body;
    const { token } = req.query;
    showLog(`postSpecialty`);
    try {
        // Verifico token. Sólo un superAdmin puede agregar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        if (!specialtyName) { throw Error("Data missing"); }
        const specLowercase = specialtyName.toLowerCase();
        const existingSpec = await Specialty.findOne({
            where: { specialtyName: { [Op.iLike]: specLowercase } },
        });
        if (existingSpec) {
            showLog(`postSpecialty: ${specialtyName} already exists`);
            return res.status(409).send(`${specialtyName} already exists.`);
        }
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