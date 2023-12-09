// ! Almacena un nuevo usuario, si no es repetido.
const { conn, User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postNewUser = async (req, res) => {
    const { userName, name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = req.body;
    showLog(`postNewUser`);
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!userName || !name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Data missing"); }
        // Verifico si ya existe el registro:
        const nameLowercase = userName.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (existingUser) {
            showLog(`postNewUser: the user ${userName} already exists`);
            return res.status(409).send(`The user ${userName} already exists.`);
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
        // Creo el registro:
        const [UserCreated, created] = await User.findOrCreate({
            where: { userName, notificationEmail, name, lastName, phoneNumber1: phone1, phoneNumber2: phone2, image, comission, token: "", role },
            transaction,
        });
        // Agrego relación con sede:
        await UserCreated.setBranch(branch, { transaction });
        // Busco las especialidades para agregar las relaciones:
        for (const spec of specialty) {
            await UserCreated.addSpecialties(spec, { transaction });
        }
        // Confirmo la transacción:
        await transaction.commit();
        showLog(`postNewUser OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        // Revierto la transacción:
        if (transaction) await transaction.rollback();
        showLog(`postNewUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}

module.exports = postNewUser;
