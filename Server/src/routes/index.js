const router = require("express").Router();
//Controllers:
const getMain = require("../controllers/getMain");

const getUser = require("../controllers/user/getUser");
const getAllUsers = require("../controllers/user/getAllUsers");
const postUser = require("../controllers/user/postUser");
const putUser = require("../controllers/user/putUser");
const getBranches = require("../controllers/branch/getBranches");
const postBranch = require("../controllers/branch/postBranch");
const putBranch = require("../controllers/branch/putBranch");


const getPayments = require("../controllers/payment/getPayments");
const postPayment = require("../controllers/payment/postPayment");
const putPayment = require("../controllers/payment/putPayment");
const getSpecialties = require("../controllers/specialty/getSpecialties");
const putSpeciality = require("../controllers/specialty/putSpeciality");
const postSpecialty = require("../controllers/specialty/postSpecialty");

//Rutas:
router.get("/", getMain);
router.get("/userdata", getUser); // obtiene los datos del usuario
router.get("/branches", getBranches); // obtiene las sedes
router.post("/branch", postBranch); // crea una sede
router.put("/branch/:id", putBranch); // edita una sede

router.get("/payments", getPayments); // obtiene los medios de pago
router.get("/specialties", getSpecialties); // obtiene las especialidades
router.get("/users", getAllUsers); // obtiene todos los usuarios
router.post("/userdata", postUser); //  crea un nuevo usuario
router.post("/specialty", postSpecialty); //  crea una especialidad
router.post("/payment", postPayment); //  crea un pago
router.put("/payment/:id", putPayment); //  edita un pago
router.put("/userdata/:id", putUser); //  edita un usuario
router.put("/specialty/:id", putSpeciality); //  edita una especialidad
module.exports = router;
