const router = require("express").Router();
//Controllers:
const getMain = require("../controllers/getMain");

const getAllUsers = require("../controllers/user/getAllUsers");
const getUser = require("../controllers/user/getUser");
const getUserData = require("../controllers/user/getUserData");
const postUser = require("../controllers/user/postUser");
const putUser = require("../controllers/user/putUser");
const deleteUser = require("../controllers/user/deleteUser");

const getSpecialties = require("../controllers/specialty/getSpecialties");
const postSpecialty = require("../controllers/specialty/postSpecialty");
const putSpeciality = require("../controllers/specialty/putSpeciality");
const deleteSpecialty = require("../controllers/specialty/deleteSpecialty");

const getPayments = require("../controllers/payment/getPayments");
const postPayment = require("../controllers/payment/postPayment");
const putPayment = require("../controllers/payment/putPayment");
const deletePayment = require("../controllers/payment/deletePayment");

const getBranches = require("../controllers/branch/getBranches");
const postBranch = require("../controllers/branch/postBranch");
const putBranch = require("../controllers/branch/putBranch");
const deleteBranch = require("../controllers/branch/deleteBranch");

//Rutas:
router.get("/", getMain);
router.get("/users", getAllUsers); // obtiene todos los usuarios

router.get("/userdata", getUser); // obtiene los datos del usuario para el login
router.get("/userdata/:id", getUserData); // obtiene los detalles del usuario por id
router.get("/specialties", getSpecialties); // obtiene las especialidades
router.get("/payments", getPayments); // obtiene los medios de pago
router.get("/branches", getBranches); // obtiene las sedes

router.post("/userdata", postUser); //  crea un nuevo usuario
router.post("/specialty", postSpecialty); //  crea una especialidad
router.post("/payment", postPayment); //  crea un pago
router.post("/branch", postBranch); // crea una sede

router.put("/userdata/:id", putUser); //  edita un usuario
router.put("/specialty/:id", putSpeciality); //  edita una especialidad
router.put("/payment/:id", putPayment); //  edita un pago
router.put("/branch/:id", putBranch); // edita una sede

router.delete("/userdata/:id", deleteUser); //  elimina un usuario
router.delete("/specialty/:id", deleteSpecialty); //  elimina una especialidad
router.delete("/payment/:id", deletePayment); //  elimina un medio de pago
router.delete("/branch/:id", deleteBranch); //  elimina una sede

module.exports = router;
