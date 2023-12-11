// ! Obtiene las especialidades.
const { Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getSpecialties = async (req, res) => {
    const { token } = req.query;
    showLog(`getSpecialties`);
    try {
        // Verifico token:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist) {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        reg = await Specialty.findAll({
            attributes: ["id", "specialtyName"],
        });
        showLog(`getSpecialties OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getSpecialties ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getSpecialties;
