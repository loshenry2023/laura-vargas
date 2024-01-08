// ! Obtiene los datos de un usuario para el login. Además se registra el token recibido.
const { User, Specialty, Branch, Calendar } = require('../../DB_connection');
const showLog = require("../../functions/showLog");
const { Op } = require('sequelize');

const postUserLogin = async (req, res) => {
    const { nameUser, idUser } = req.body;
    showLog(`postUserLogin`);
    try {
        if (!nameUser || !idUser) { throw Error("Faltan datos"); }
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
                    through: 'user_branch',
                },
            ],
        });
        if (!existingUser) {
            showLog(`postUserLogin: user ${nameUser} not found`);
            return res.status(404).send(`Usuario ${nameUser} no encontrado.`);
        }
        // Actualizo el token:
        existingUser.token = idUser;
        // Establezco la hora de login, para calcular el tiempo de inactividad en los próximos llamados:
        const currentTime = new Date();
        existingUser.lastUse = currentTime;
        await existingUser.save();
        // Obtengo las sedes relacionadas y las citas que tiene reservadas en cada una para la fecha actual:
        const miDate = new Date();
        const currentDateWithoutTime = miDate.toISOString().slice(0, 10);
        //const userBranches = existingUser.Branches.map(branch => ({ id: branch.id, branchName: branch.branchName }));
        const userBranches = await Promise.all(existingUser.Branches.map(async (branch) => {
            const appointments = await calendarPromises(branch.id, currentDateWithoutTime, existingUser.id);
            return { id: branch.id, branchName: branch.branchName, appointments };
        }));
        // Obtengo las especialidades relacionadas:
        const userSpecialties = existingUser.Specialties.map(specialty => ({ id: specialty.id, specialtyName: specialty.specialtyName }));

        const userData = {
            id: existingUser.id,
            userName: existingUser.userName,
            branches: userBranches,
            name: existingUser.name,
            lastName: existingUser.lastName,
            role: existingUser.role,
            notificationEmail: existingUser.notificationEmail,
            phone1: existingUser.phoneNumber1,
            phone2: existingUser.phoneNumber2,
            image: existingUser.image,
            comission: existingUser.comission,
            specialties: userSpecialties,
            token: existingUser.token,
            createdAt: existingUser.createdAt,
        }
        showLog(`postUserLogin OK`);
        return res.status(200).json(userData);
    } catch (err) {
        showLog(`postUserLogin ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}

async function calendarPromises(branchId, currentDateWithoutTime, idUser) {
    // Obtengo la cantidad de citas para la sede actual, para la fecha actual:
    const result = await Calendar.findAndCountAll({
        attributes: ["id"],
        where: {
            date_from: {
                [Op.gte]: currentDateWithoutTime + " 00:00:00",
                [Op.lte]: currentDateWithoutTime + " 23:59:59",
            },
            current: true,
        },
        include: [
            {
                model: Branch,
                attributes: ["id"],
                where: { id: branchId },
            },
            {
                model: User,
                attributes: ["id"],
                where: idUser ? { id: idUser } : {},
            },
        ],
    });
    const Out = result.count;
    return Out;
}

module.exports = postUserLogin;