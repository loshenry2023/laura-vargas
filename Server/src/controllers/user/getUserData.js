// ! Obtiene los datos de un usuario.
const { User, Branch, Specialty } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getUserData = async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    showLog(`getUserData`);
    try {
        // Verifico token:
        if (!token) { throw Error("Se requiere token"); }
        const checked = await checkToken(token);
        if (!checked.exist) {
            showLog(`Wrong token.`);
            return res.status(401).send(`Sin permiso.`);
        }
        if (!id) { throw Error("Faltan datos"); }
        const existingUser = await User.findByPk(id, {
            include: [
                {
                    model: Specialty,
                    as: 'Specialties',
                    attributes: ['id', 'specialtyName'],
                    through: { attributes: [] }
                },
                {
                    model: Branch,
                    attributes: ['id', 'branchName'],
                },
            ],
        });
        if (!existingUser) {
            showLog(`getUserData: ${id} not found.`);
            return res.status(404).send(`${id} no encontrado.`);
        }
        // Obtengo la sede relacionada:
        const branchData = existingUser.Branch ? { id: existingUser.Branch.id, branchName: existingUser.Branch.branchName } : null;
        // Devuelvo los datos del usuario:
        const userData = {
            id: existingUser.id,
            userName: existingUser.userName,
            branch: branchData,
            name: existingUser.name,
            lastName: existingUser.lastName,
            role: existingUser.role,
            notificationEmail: existingUser.notificationEmail,
            phone1: existingUser.phoneNumber1,
            phone2: existingUser.phoneNumber2,
            image: existingUser.image,
            comission: existingUser.comission,
            specialties: existingUser.Specialties,
            createdAt: existingUser.createdAt
        }
        showLog(`getUserData OK`);
        return res.status(200).json(userData);
    } catch (err) {
        showLog(`getUserData ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = getUserData;