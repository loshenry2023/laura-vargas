const router = require("express").Router();
//Controllers:
const getMain = require("../controllers/getMain");
const getUser = require("../controllers/getUser");
const getBranches = require("../controllers/getBranches");
const getPayments = require("../controllers/getPayments");
const getSpecialties = require("../controllers/getSpecialties");
const getAllUsers = require("../controllers/getAllUsers");
const postUser = require("../controllers/postUser");

//Rutas:
router.get("/", getMain);
router.get("/userdata", getUser); // obtiene los datos del usuario
router.get("/branches", getBranches); // obtiene las sedes
router.get("/payments", getPayments); // obtiene los medios de pago
router.get("/specialties", getSpecialties); // obtiene las especialidades
router.get("/users", getAllUsers); // obtiene todos los usuarios
router.post("/userdata", postUser); //  crea un nuevo usuario

module.exports = router;
