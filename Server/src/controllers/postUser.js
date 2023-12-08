// ! Almacena un nuevo usuario en base de datos, si no es repetido.
const { User } = require('../DB_connection');
//const { Branch } = require('../DB_connection');
const showLog = require("../functions/showLog");
const { Op } = require('sequelize');

const postUser = async (req, res) => {
    const { userName, name, lastName, role, notificationEmail, phone1, phone2, image, comission, branch } = req.body;
    showLog(`postUser`);
    try {
        if (!userName || !name || !lastName || !role || !notificationEmail || !phone1 || !phone2 || !image || !comission || !branch) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con el mismo userName:
        const nameLowercase = name.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (existingUser) {
            showLog(`postUser: the user ${name} already exists`);
            return res.status(409).send(`The user ${name} already exists.`);
        }
        // Creo el registro si no existe:
        const [UserCreated, created] = await User.findOrCreate({
            where: { userName, notificationEmail, name, lastName, phoneNumber1, phoneNumber2, image, comission, token, role, active: "1" },
        });
        //Agrego relación:
        await UserCreated.setBranch(branch);
        showLog(`postUser OK`);
        return res.status(200).json({ "created": "ok", "id": createdVideogameId });
    } catch (err) {
        showLog(`postUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postUser;