// ! Obtiene los datos de un usuario para el login. Además se registra el token recibido.
const { User, Specialty, Branch } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postUserLogin = async (req, res) => {
    const { nameUser, idUser } = req.body;
    showLog(`postUserLogin`);
    try {
        if (!nameUser || !idUser) { throw Error("Data missing"); }
        // Verifico que el usuario exista en tabla:
        const nameLowercase = nameUser.toLowerCase();
        const existingUser = await User.findOne({
            where: { userName: { [Op.iLike]: nameLowercase } },
            include: [
                {
                    model: Specialty,
                    through: 'user_specialty',
                },
                {
                    model: Branch,
                    attributes: ['id', 'branchName'],
                },
            ],
        });
        if (!existingUser) {
            showLog(`postUserLogin: user ${nameUser} not found`);
            return res.status(404).send(`user ${nameUser} not found.`);
        }
        // Actualizo el token:
        existingUser.token = idUser;
        await existingUser.save();
        // Obtengo la sede relacionada:
        const branchData = existingUser.Branch ? { id: existingUser.Branch.id, branchName: existingUser.Branch.branchName } : null;
        // Obtengo las especialidades relacionadas:
        const userSpecialties = existingUser.Specialties.map(specialty => ({ id: specialty.id, specialtyName: specialty.specialtyName }));
        // Devuelvo los datos del usuario:
        const userData = {
            id: existingUser.id,
            branch: branchData,
            name: existingUser.name,
            lastName: existingUser.lastName,
            role: existingUser.role,
            notificationEmail: existingUser.notificationEmail,
            phone1: existingUser.phoneNumber1,
            phone2: existingUser.phoneNumber2,
            image: existingUser.image,
            comission: existingUser.comission,
            specialties: userSpecialties,
        }
        showLog(`postUserLogin OK`);
        return res.status(200).json(userData);
    } catch (err) {
        showLog(`postUserLogin ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postUserLogin;