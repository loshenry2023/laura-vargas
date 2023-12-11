//! Verifico que el token pertenezca a un usuario.
const { User } = require("../DB_connection");
const showLog = require("../functions/showLog");

async function checkToken(tokenRec) {
  try {
    const existingUsr = await User.findOne({
      where: { token: tokenRec },
    });
    if (existingUsr) {
      return { exist: true, id: existingUsr.id, role: existingUsr.role };
    } else {
      return { exist: false };
    }
  } catch (error) {
    showLog(`Error validating token: ${error}`);
    throw error;
  }
}

module.exports = checkToken;
