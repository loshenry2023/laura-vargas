// ! Edita un usuario.
const { User, Specialty } = require('../../DB_connection');
const showLog = require('../../functions/showLog');
const { FIRST_SUPERADMIN } = require("../../functions/paramsEnv");

const putUser = async (req, res) => {
    const { name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = req.body;
    const { id } = req.params;
    showLog('putUser');
    try {
        if (!name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Data missing"); }
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            showLog(`putUser: user ID ${id} not found.`);
            return res.status(404).send(`user ID ${id} not found.`);
        }
        // Actualizo los campos:
        existingUser.name = name;
        existingUser.lastName = lastName;
        existingUser.notificationEmail = notificationEmail;
        existingUser.phone1 = phone1;
        existingUser.phone2 ? phone2 : "";
        existingUser.image = image;
        existingUser.comission = comission;
        if (existingUser.userName !== FIRST_SUPERADMIN) {
            existingUser.role = role;
        }
        await existingUser.save();
        // Actualizo las relaciones:
        await existingUser.setBranch(branch);
        if (existingUser.userName !== FIRST_SUPERADMIN) {
            // Busco las especialidades para actualizar las relaciones:
            let specialties = await Specialty.findAll({
                where: { id: specialty }
            });
            await existingUser.setSpecialties(specialties);
        }
        showLog('putUser OK');
        return res.status(200).json({ updated: 'ok', id: existingUser.id });
    } catch (err) {
        showLog(`putUser ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putUser;