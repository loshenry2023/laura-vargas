// ! Obtiene todos los usuarios desde la BD.
const axios = require('axios');
const { User } = require('../DB_connection');
const showLog = require("../functions/showLog");

const getAllUsers = async (req, res) => {
    try {
        showLog(`getAllUsers`);
        reg = await User.findAll({
            attributes: ["id", "userName", "notificationEmail", "name", "lastName", "phoneNumber1", "phoneNumber2", "image", "comission", "role"],
            where: { active: "1" },
        });
        showLog(`getAllUsers OK`);
        res.status(200).json(reg);
    } catch (err) {
        showLog(`getAllUsers ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getAllUsers;
