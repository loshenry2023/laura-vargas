//! Controllers
const router = require("express").Router();
// Únicamente para el deploy:
const getMain = require("../controllers/getMain");
// Usuarios:
const postUserLogin = require("../controllers/user/postUserLogin");
const getUserData = require("../controllers/user/getUserData");
const postNewUser = require("../controllers/user/postNewUser");
const putUser = require("../controllers/user/putUser");
const deleteUserHandler = require("../Handlers/deleteUserHandler");
const usersHandler = require("../Handlers/usersHandler");
// Especialidades:
const getSpecialtiesHandler = require("../Handlers/getSpecialtiesHandler");
const postSpecialty = require("../controllers/specialty/postSpecialty");
const putSpeciality = require("../controllers/specialty/putSpeciality");
const deleteSpecialtyHandler = require("../Handlers/deleteSpecialtyHandler");

// Medios de pago:
const getPaymentsHandler = require("../Handlers/getPaymentsHandler");
const postPayment = require("../controllers/payment/postPayment");
const putPayment = require("../controllers/payment/putPayment");
const deletePaymentHandler = require("../Handlers/deletePaymentHandler");

// Sedes:
const getBranchHandler = require("../Handlers/getBranchHandler");
const postBranch = require("../controllers/branch/postBranch");
const putBranch = require("../controllers/branch/putBranch");
const deleteBranchHandler = require("../Handlers/deleteBranchHandler");

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
router.post("/specialty", postSpecialty); //  crea una especialidad
router.post("/payment", postPayment); //  crea un pago
router.post("/branch", postBranch); // crea una sede
router.post("/userdata", postUserLogin); // obtiene los datos de un usuario para el login, registra el token y devuelve sus datos asociados
// PUT:
router.put("/userdata/:id", putUser); //  edita un usuario
router.put("/specialty/:id", putSpeciality); //  edita una especialidad
router.put("/payment/:id", putPayment); //  edita un pago
router.put("/branch/:id", putBranch); // edita una sede
// DELETE:
router.delete("/userdata/:id", deleteUserHandler); //  elimina un usuario
router.delete("/specialty/:id", deleteSpecialtyHandler); //  elimina una especialidad
router.delete("/payment/:id", deletePaymentHandler); //  elimina un medio de pago
router.delete("/branch/:id", deleteBranchHandler); //  elimina una sede

module.exports = router;
