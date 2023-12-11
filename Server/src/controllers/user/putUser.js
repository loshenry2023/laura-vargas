// ! Edita un usuario.
const { conn, User, Specialty } = require('../../DB_connection');
const showLog = require('../../functions/showLog');
const checkToken = require('../../functions/checkToken');
const { FIRST_SUPERADMIN } = require("../../functions/paramsEnv");

const putUser = async (req, res) => {
    const { name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = req.body;
    const { id } = req.params;
    const { token } = req.query;
    showLog('putUser');
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Data missing"); }
        // Verifico token. Sólo un superAdmin puede editar:
        // if (!token) { throw Error("Token required"); }
        // const checked = await checkToken(token);
        // if (!checked.exist || checked.role !== "superAdmin") {
        //     showLog(`Wrong token.`);
        //     return res.status(401).send(`Unauthorized.`);
        // }
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            showLog(`putUser: user ID ${id} not found.`);
            return res.status(404).send(`user ID ${id} not found.`);
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        existingUser.name = name;
        existingUser.lastName = lastName;
        existingUser.notificationEmail = notificationEmail;
        existingUser.phoneNumber1 = phone1;
        existingUser.phoneNumber2 ? phone2 : "";
        existingUser.image = image;
        existingUser.comission = comission;
        if (existingUser.userName !== FIRST_SUPERADMIN) {
            existingUser.role = role;
        }

        console.log(existingUser, "probando en el back")
        await existingUser.save();
        // Actualizo la relación con sede:
        await existingUser.setBranch(branch, { transaction });
        if (existingUser.userName !== FIRST_SUPERADMIN) {
            // Busco las especialidades para actualizar las relaciones:
            await existingUser.removeSpecialties(); // elimino las relaciones previas
            for (const spec of specialty) {
                await existingUser.addSpecialties(spec, { transaction });
            }
        }
        await transaction.commit();
        showLog('putUser OK');
        return res.status(200).json({ updated: 'ok', id: existingUser.id });
    } catch (err) {
        if (transaction) await transaction.rollback();
        showLog(`putUser ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putUser;