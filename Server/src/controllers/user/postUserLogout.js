// ! Logout: elimino el token del usuario.
const { User } = require('../../DB_connection');
const showLog = require('../../functions/showLog');
const checkToken = require('../../functions/checkToken');

const postUserLogout = async (req, res) => {
    const { token } = req.body;
    showLog(`postUserLogout`);
    try {
        // Verifico token, con parámetro de indicación de borrado:
        if (!token) { throw Error("Se requiere token"); }
        const checked = await checkToken(token, true);
        if (!checked.exist || !checked.cleared) {
            showLog(`Wrong token.`);
            return res.status(401).send(`Sin permiso.`);
        }
        showLog('postUserLogout OK');
        return res.status(200).json({ updated: 'ok', });
    } catch (err) {
        showLog(`postUserLogout ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = postUserLogout;