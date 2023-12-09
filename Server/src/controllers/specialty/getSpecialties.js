// ! Obtiene las especialidades.
const axios = require('axios');
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");

const getSpecialties = async (req, res) => {
    try {
        showLog(`getSpecialties`);
        reg = await Specialty.findAll({
            attributes: ["id", "specialtyName"],
            where: { active: "1" },
        });
        showLog(`getSpecialties OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getSpecialties ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getSpecialties;
