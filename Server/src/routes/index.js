//! Controllers
const router = require("express").Router();
// Únicamente para el deploy:
const getMain = require("../controllers/getMain");
// Usuarios:
const getAllUsers = require("../controllers/user/getAllUsers");
const postUserLogin = require("../controllers/user/postUserLogin");
const getUserData = require("../controllers/user/getUserData");
const postNewUser = require("../controllers/user/postNewUser");
const putUser = require("../controllers/user/putUser");
const deleteUser = require("../controllers/user/deleteUser");
// Especialidades:
const getSpecialties = require("../controllers/specialty/getSpecialties");
const postSpecialty = require("../controllers/specialty/postSpecialty");
const putSpeciality = require("../controllers/specialty/putSpeciality");
const deleteSpecialty = require("../controllers/specialty/deleteSpecialty");
// Medios de pago:
const getPayments = require("../controllers/payment/getPayments");
const postPayment = require("../controllers/payment/postPayment");
const putPayment = require("../controllers/payment/putPayment");
const deletePayment = require("../controllers/payment/deletePayment");
// Sedes:
const getBranches = require("../controllers/branch/getBranches");
const postBranch = require("../controllers/branch/postBranch");
const putBranch = require("../controllers/branch/putBranch");
const deleteBranch = require("../controllers/branch/deleteBranch");

//! Rutas
// GET:
router.get("/", getMain); // únicamente para el deploy
router.get("/users", getAllUsers); // obtiene y devuelve todos los usuarios
router.get("/userdata/:id", getUserData); // obtiene y devuelve los detalles de un usuario por id
router.get("/specialties", getSpecialties); // obtiene y devuelve todas las especialidades
router.get("/payments", getPayments); // obtiene y devuelve todos los medios de pago
router.get("/branches", getBranches); // obtiene y devuelve todas las sedes
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
router.delete("/userdata/:id", deleteUser); //  elimina un usuario
router.delete("/specialty/:id", deleteSpecialty); //  elimina una especialidad
router.delete("/payment/:id", deletePayment); //  elimina un medio de pago
router.delete("/branch/:id", deleteBranch); //  elimina una sede

module.exports = router;
