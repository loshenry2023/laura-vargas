// ! Obtiene las sedes desde la BD.
const axios = require('axios');
const { Branch } = require('../DB_connection');
const showLog = require("../functions/showLog");

const getBranches = async (req, res) => {
    try {
        showLog(`getBranches`);
        reg = await Branch.findAll({
            attributes: ["id", "branchName", "coordinates", "address", "phoneNumber", "openningHours", "clossingHours", "workingDays"],
            where: { active: "1" },
        });
        showLog(`getBranches OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getBranches ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getBranches;
