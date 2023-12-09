// ! Almacena una nueva sede, si no es repetida.
const { Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postBranch = async (req, res) => {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = req.body;
    showLog(`postBranch`);
    try {
        if (!branchName || !phoneNumber || !address) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con la misma descripción:
        const branchLowercase = branchName.toLowerCase();
        const existingBranch = await Branch.findOne({
            where: { branchName: { [Op.iLike]: branchLowercase } },
        });
        if (existingBranch) {
            showLog(`postBranch: ${branchName} already exists`);
            return res.status(409).send(`${branchName} already exists.`);
        }
        // Creo el registro si no existe:
        const [BranchCreated, created] = await Branch.findOrCreate({
            where: { branchName, phoneNumber, address, coordinates, openningHours, clossingHours, workingDays },
        });
        showLog(`postBranch OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`postBranch ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postBranch;