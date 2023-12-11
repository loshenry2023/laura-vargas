// ! Edita una sede.
const { Branch } = require('../../DB_connection');
const showLog = require('../../functions/showLog');
const checkToken = require('../../functions/checkToken');

const putBranch = async (req, res) => {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = req.body;
    const { id } = req.params;
    const { token } = req.query;
    showLog('putBranch');
    try {
        if (!branchName || !id) { throw Error("Data missing"); }
        // Verifico token. Sólo un superAdmin puede editar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        const existingBranch = await Branch.findByPk(id);
        if (!existingBranch) {
            showLog(`putBranch: ${id} not found.`);
            return res.status(404).send(`${id} not found.`);
        }
        existingBranch.branchName = branchName;
        existingBranch.coordinates = coordinates;
        existingBranch.address = address;
        existingBranch.phoneNumber = phoneNumber;
        existingBranch.openningHours = openningHours;
        existingBranch.clossingHours = clossingHours;
        existingBranch.workingDays = workingDays;
        await existingBranch.save();
        showLog('putBranch OK');
        return res.status(200).json({ updated: 'ok' });
    } catch (err) {
        showLog(`putBranch ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putBranch;