// ! Almacena un nuevo usuario, si no es repetido.
const { User } = require('../../DB_connection');
//const { Branch } = require('../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postUser = async (req, res) => {
    const { userName, name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch } = req.body;
    showLog(`postUser`);
    try {
        if (!userName || !name || !lastName || !role || !notificationEmail || !phone1 || !image || !comission || !branch) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con el mismo userName:
        const nameLowercase = userName.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (existingUser) {
            showLog(`postUser: the user ${userName} already exists`);
            return res.status(409).send(`The user ${userName} already exists.`);
        }
        // Creo el registro si no existe:
        const [UserCreated, created] = await User.findOrCreate({
            where: { userName, notificationEmail, name, lastName, phoneNumber1: phone1, phoneNumber2: phone2, image, comission, token: "", role },
        });
        //Agrego relación:
        await UserCreated.setBranch(branch);
        showLog(`postUser OK`);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`postUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postUser;