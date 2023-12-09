// ! Edita una sede.
const { Branch } = require('../../DB_connection');
const showLog = require('../../functions/showLog');

const putBranch = async (req, res) => {
    const { branchName, coordinates, address, phoneNumber, openningHours, clossingHours, workingDays } = req.body;
    const { id } = req.params;
    showLog('putBranch');
    try {
        if (!branchName || !id) { throw Error("Data missing"); }
        const existingBranch = await Branch.findByPk(id);
        if (!existingBranch) {
            showLog(`putBranch: ${paymentMethodName} not found.`);
            return res.status(404).send(`${paymentMethodName} not found.`);
        }
        // Actualizo los campos:
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