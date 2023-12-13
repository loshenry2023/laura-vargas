//! Controllers
const router = require("express").Router();
// Únicamente para el deploy:
const getMain = require("../controllers/getMain");
// Usuarios:
const postUserLogin = require("../controllers/user/postUserLogin");
const postUserLogout = require("../controllers/user/postUserLogout");
const getUserData = require("../controllers/user/getUserData");
const postNewUser = require("../controllers/user/postNewUser");
const putUser = require("../controllers/user/putUser");
const deleteUserHandler = require("../Handlers/user/deleteUserHandler");
const usersHandler = require("../Handlers/user/usersHandler");
// Especialidades:
const getSpecialtiesHandler = require("../Handlers/specialty/getSpecialtiesHandler");
const postSpecialtyHandler = require("../Handlers/specialty/postSpecialtyHandler");
const putSpecialtyHandler = require("../Handlers/specialty/putSpecialtyHandler");
const deleteSpecialtyHandler = require("../Handlers/specialty/deleteSpecialtyHandler");
// Medios de pago:
const getPaymentsHandler = require("../Handlers/payment/getPaymentsHandler");
const putPaymentHandler = require("../Handlers/payment/putPaymentHandler");
const deletePaymentHandler = require("../Handlers/payment/deletePaymentHandler");
const postPaymentHandler = require("../Handlers/payment/postPaymentHandler");
// Sedes:
const getBranchHandler = require("../Handlers/branch/getBranchHandler");
const postBranchHandler = require("../Handlers/branch/postBranchHandler");
const putBranchHandler = require("../Handlers/branch/putBranchHandler");
const deleteBranchHandler = require("../Handlers/branch/deleteBranchHandler");

//! Rutas
// GET:
router.get("/", getMain); // únicamente para el deploy
router.get("/users", usersHandler); // obtiene y devuelve todos los usuarios
router.get("/userdata/:id", getUserData); // obtiene y devuelve los detalles de un usuario por id
router.get("/specialties", getSpecialtiesHandler); // obtiene y devuelve todas las especialidades
router.get("/payments", getPaymentsHandler); // obtiene y devuelve todos los medios de pago
router.get("/branches", getBranchHandler); // obtiene y devuelve todas las sedes
// POST:
router.post("/newuser", postNewUser); //  crea un usuario
router.post("/specialty", postSpecialtyHandler); //  crea una especialidad
router.post("/payment", postPaymentHandler); //  crea un medio de pago
router.post("/branch", postBranchHandler); // crea una sede
router.post("/userdata", postUserLogin); // obtiene los datos de un usuario para el login, registra el token y devuelve sus datos asociados
router.post("/logoutuser", postUserLogout); // logout de usuario, borra el token registrado
// PUT:
router.put("/userdata/:id", putUser); //  edita un usuario
router.put("/specialty/:id", putSpecialtyHandler); //  edita una especialidad
router.put("/payment/:id", putPaymentHandler); //  edita un pago
router.put("/branch/:id", putBranchHandler); // edita una sede
// DELETE:
router.delete("/userdata/:id", deleteUserHandler); //  elimina un usuario
router.delete("/specialty/:id", deleteSpecialtyHandler); //  elimina una especialidad
router.delete("/payment/:id", deletePaymentHandler); //  elimina un medio de pago
router.delete("/branch/:id", deleteBranchHandler); //  elimina una sede

module.exports = router;
