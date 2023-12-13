// ! Almacena un nuevo usuario, si no es repetido.
const { conn, User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');
const { Op } = require('sequelize');

const postNewUser = async (req, res) => {
    const { userName, name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch, specialty } = req.body;
    const { token } = req.query;
    showLog(`postNewUser (tkn ${token})`);
    let transaction; // manejo transacciones para evitar registros defectuosos por relaciones mal solicitadas
    try {
        if (!userName || !name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch || !specialty) { throw Error("Faltan datos"); }
        // Verifico token. Sólo un superAdmin puede agregar:
        if (!token) { throw Error("Se requiere token"); }
        const checked = await checkToken(token);
        if (!checked.exist || checked.role !== "superAdmin") {
            showLog(`Wrong token.`);
            return res.status(401).send(`Sin permiso.`);
        }
        const nameLowercase = userName.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (existingUser) {
            showLog(`postNewUser: the user ${userName} already exists`);
            return res.status(409).send(`The user ${userName} ya existe.`);
        }
        // Inicio la transacción:
        transaction = await conn.transaction();
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
        await transaction.commit();
        showLog(`postNewUser OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        if (transaction) await transaction.rollback();
        showLog(`postNewUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}

module.exports = postNewUser;
