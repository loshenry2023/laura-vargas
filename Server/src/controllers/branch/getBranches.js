// ! Obtiene las sedes.
const { Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getBranches = async (req, res) => {
    const { token } = req.query;
    showLog(`getBranches`);
    try {
        // Verifico token:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist) {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        reg = await Branch.findAll({
            attributes: ["id", "branchName", "coordinates", "address", "phoneNumber", "openningHours", "clossingHours", "workingDays"],
        });
        showLog(`getBranches OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getBranches ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getBranches;
