//! Verifico que el token pertenezca a un usuario.
const { User } = require("../DB_connection");
const showLog = require("../functions/showLog");

async function checkToken(tokenRec, clearToken = false) {
  try {
    const existingUsr = await User.findOne({
      where: { token: tokenRec },
    });
    if (existingUsr) {
      // Además de encontrarlo se pide que lo elimine. Se aplica para logout:
      if (clearToken) {
        existingUsr.token = "";
        await existingUsr.save();
        return { exist: true, cleared: true };
      } else {
        return { exist: true, id: existingUsr.id, role: existingUsr.role };
      }
    } else {
      return { exist: false };
    }
  } catch (error) {
    showLog(`Error validating token: ${error}`);
    throw Error("Error validando token: " + error);
  }
}

module.exports = checkToken;
