// ! Almacena una nueva sede, si no es repetida.
const { Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const { Op } = require('sequelize');

const postBranch = async (req, res) => {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = req.body;
    const { token } = req.query;
    showLog(`postBranch`);
    try {
        if (!branchName || !phoneNumber || !address) { throw Error("Data missing"); }
        // Verifico token. Sólo un superAdmin puede agregar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        const branchLowercase = branchName.toLowerCase();
        const existingBranch = await Branch.findOne({
            where: { branchName: { [Op.iLike]: branchLowercase } },
        });
        if (existingBranch) {
            showLog(`postBranch: ${branchName} already exists`);
            return res.status(409).send(`${branchName} already exists.`);
        }
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