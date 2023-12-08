// ! Obtiene los datos del usuario.
const { User } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const getUser = async (req, res) => {
    const { nameUser, idUser } = req.body;
    showLog(`getUser`);
    try {
        if (!nameUser || !idUser) { throw Error("Data missing"); }
        // Verifico que el usuario exista en tabla:
        const nameLowercase = nameUser.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
        });
        if (!existingUser) {
            showLog(`getUser: user ${nameUser} not found`);
            return res.status(404).send(`user ${nameUser} not found.`);
        }
        if (existingUser.active === "0") {
            showLog(`getUser: user ${nameUser} not active`);
            return res.status(401).send(`user ${nameUser} not active.`);
        }
        // Actualizo el token:
        existingUser.token = idUser;
        await existingUser.save();
        // Devuelvo los datos del usuario:
        const userData = {
            name: existingUser.name,
            lastName: existingUser.lastName,
            role: existingUser.role,
            notificationEmail: existingUser.notificationEmail,
            phone1: existingUser.phoneNumber1,
            phone2: existingUser.phoneNumber2,
            image: existingUser.image,
            comission: existingUser.comission,
        }
        showLog(`getUser OK`);
        return res.status(200).json(userData);
    } catch (err) {
        showLog(`getUser ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = getUser;