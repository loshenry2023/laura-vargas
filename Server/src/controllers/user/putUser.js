// ! Edita un usuario.
const { User } = require('../../DB_connection');
const showLog = require('../../functions/showLog');

const putUser = async (req, res) => {
    const { name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch } = req.body;
    const { id } = req.params;
    showLog('putUser');
    try {
        if (!name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch) { throw Error("Data missing"); }
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            showLog(`putUser: user ID ${id} not found.`);
            return res.status(404).send(`Game user ID ${id} not found.`);
        }
        // Actualizo los campos:
        existingUser.name = name;
        existingUser.lastName = lastName;
        existingUser.role = role;
        existingUser.notificationEmail = notificationEmail;
        existingUser.phone1 = phone1;
        existingUser.phone2 ? phone2 : "";
        existingUser.image = image;
        existingUser.comission = comission;
        await existingUser.save();
        // Actualizo las relaciones:
        await existingUser.setBranch(branch);
        showLog('putUser OK');
        return res.status(200).json({ updated: 'ok', id: existingUser.id });
    } catch (err) {
        showLog(`putUser ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putUser;