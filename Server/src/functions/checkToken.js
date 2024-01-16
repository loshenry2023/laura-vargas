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
        existingUsr.lastUse = "1900-01-01";
        await existingUsr.save();
        return { exist: true, cleared: true, code: 200 };
      } else {
        // Verifico si el token sigue siendo vigente, comparando por tiempo transcurrido desde su último uso:
        const currentTime = new Date();
        const lastUseTime = existingUsr.lastUse;
        // Calculo la diferencia en minutos:
        const minutesDifference = Math.floor(
          (currentTime - lastUseTime) / (1000 * 60)
        );
        // Verifico si pasaron 18 hs. desde el último uso:
        if (minutesDifference > 1080) {
          return { exist: false, mensaje: "La sesión expiró", code: 403 };
        }

        // Actualizo la fecha y hora del último uso:
        existingUsr.lastUse = currentTime;
        await existingUsr.save();
        return {
          exist: true,
          id: existingUsr.id,
          role: existingUsr.role,
          code: 200,
        };
      }
    } else {
      return { exist: false, mensaje: "Sin permiso", code: 401 };
    }
  } catch (error) {
    showLog(`Error validating token: ${error}`);
    throw Error("Error validando token: " + error);
  }
}

module.exports = checkToken;
