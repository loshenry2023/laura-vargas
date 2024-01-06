// ! Logout: elimino el token del usuario.
const showLog = require('../../functions/showLog');
const checkToken = require('../../functions/checkToken');

const postUserLogout = async (req, res) => {
    const { token } = req.body;
    showLog(`postUserLogout`);
    try {
        // Verifico token, con parámetro de indicación de borrado:
        if (!token) { throw Error("Se requiere token"); }
        const checked = await checkToken(token, true);
        return res.status(200).json({ updated: 'ok', });
    } catch (err) {
        showLog(`postUserLogout ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = postUserLogout;