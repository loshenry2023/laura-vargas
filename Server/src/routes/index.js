//! Controllers
const router = require("express").Router();
// Únicamente para el deploy:
const getMain = require("../controllers/getMain");
// Usuarios:
const postUserHandler = require("../Handlers/user/postUserHandler");
const putUserHandler = require("../Handlers/user/putUserHandler");
const deleteUserHandler = require("../Handlers/user/deleteUserHandler");
const usersHandler = require("../Handlers/user/usersHandler");
const getUserData = require("../controllers/user/getUserData");
const postUserLogin = require("../controllers/user/postUserLogin");
const postUserLogout = require("../controllers/user/postUserLogout");
// Especialidades:
const postSpecialtyHandler = require("../Handlers/specialty/postSpecialtyHandler");
const putSpecialtyHandler = require("../Handlers/specialty/putSpecialtyHandler");
const deleteSpecialtyHandler = require("../Handlers/specialty/deleteSpecialtyHandler");
const getSpecialtiesHandler = require("../Handlers/specialty/getSpecialtiesHandler");
// Medios de pago:
const postPaymentHandler = require("../Handlers/payment/postPaymentHandler");
const putPaymentHandler = require("../Handlers/payment/putPaymentHandler");
const deletePaymentHandler = require("../Handlers/payment/deletePaymentHandler");
const getPaymentsHandler = require("../Handlers/payment/getPaymentsHandler");
// Sedes:
const postBranchHandler = require("../Handlers/branch/postBranchHandler");
const putBranchHandler = require("../Handlers/branch/putBranchHandler");
const deleteBranchHandler = require("../Handlers/branch/deleteBranchHandler");
const getBranchHandler = require("../Handlers/branch/getBranchHandler");
// Otros:
const sendMail = require("../Handlers/mail/sendMailHandler");
// Procedimientos:
const putServiceHandler = require("../Handlers/service/putServiceHandler");
const deleteServiceHandler = require("../Handlers/service/deleteServiceHandler");
const getServicesHandler = require("../Handlers/service/getServicesHandler");
const postServiceHandler = require("../Handlers/service/postServiceHandler");
// Clientes:
const postClientHandler = require("../Handlers/client/postClientHandler");
const deleteClientHandler = require("../Handlers/client/deleteClientHandler");
const putClientHandler = require("../Handlers/client/putClientHandler");
const getClientHandler = require("../Handlers/client/getClientHandler");
const getAllClientHandler = require("../Handlers/client/getAllClientHandler");
// Histórico de procedimientos:
const postHistoricProcHandler = require("../Handlers/historicServices/postHistoricProcHandler");
const getHistoricByClientHandler = require("../Handlers/historicServices/getHistoricByClientHandler");
const getHistoricByUsertHandler = require("../Handlers/historicServices/getHistoricByUsertHandler");
// Calendario:
const postCalendarHandler = require("../Handlers/calendar/postCalendarHandler");
const deleteCalendarHandler = require("../Handlers/calendar/deleteCalendarHandler");
const putCalendarHandler = require("../Handlers/calendar/putCalendarHandler");
const getCalendarHandler = require("../Handlers/calendar/getCalendarHandler");
// Categorías de gastos:
const postCatHandler = require("../Handlers/catGastos/postCatHandler");
const putCatHandler = require("../Handlers/catGastos/putCatHandler");
const deleteCatHandler = require("../Handlers/catGastos/deleteCatHandler");
const getCatHandler = require("../Handlers/catGastos/getCatHandler");

//inventario
const productHandlers = require("../Handlers/products/productHandlers");

//! Rutas
// Usuarios:
router.post("/newuser", postUserHandler); //  crea un usuario
router.put("/edituserdata/:id", putUserHandler); //  edita un usuario
router.post("/deleteuserdata/:id", deleteUserHandler); //  elimina un usuario
router.post("/users", usersHandler); // obtiene y devuelve todos los usuarios
router.post("/userdetails/:id", getUserData); // obtiene y devuelve los detalles de un usuario por id
router.post("/userdata", postUserLogin); // obtiene los datos de un usuario para el login, registra el token y devuelve sus datos asociados
router.post("/logoutuser", postUserLogout); // logout de usuario, borra el token registrado
// Especialidades:
router.post("/specialty", postSpecialtyHandler); //  crea una especialidad
router.put("/specialty/:id", putSpecialtyHandler); //  edita una especialidad
router.post("/deletespecialty/:id", deleteSpecialtyHandler); //  elimina una especialidad
router.post("/specialties", getSpecialtiesHandler); // obtiene y devuelve todas las especialidades
// Medios de pago:
router.post("/payment", postPaymentHandler); //  crea un medio de pago
router.put("/payment/:id", putPaymentHandler); //  edita un pago
router.post("/deletepayment/:id", deletePaymentHandler); //  elimina un medio de pago
router.post("/payments", getPaymentsHandler); // obtiene y devuelve todos los medios de pago
// Sedes:
router.post("/branch", postBranchHandler); // crea una sede
router.put("/branch/:id", putBranchHandler); // edita una sede
router.post("/deletebranch/:id", deleteBranchHandler); //  elimina una sede
router.post("/branches", getBranchHandler); // obtiene y devuelve todas las sedes
// Otras:
router.get("/", getMain); // únicamente para el deploy
router.post("/sendmail", sendMail); // envía un mail
// Procedimientos:
router.post("/service", postServiceHandler); //  crea un procedimiento
router.put("/service/:id", putServiceHandler); //  edita un procedimiento
router.post("/deleteservice/:id", deleteServiceHandler); //  elimina un procedimiento
router.post("/getservices", getServicesHandler); // obtiene y devuelve todos los procedimientos
// Clientes:
router.post("/newclient", postClientHandler); //  crea un cliente
router.put("/client/:id", putClientHandler); //  edita un cliente
router.post("/deleteclient/:id", deleteClientHandler); //  elimina un cliente
router.post("/getclient/:id", getClientHandler); // obtiene y devuelve los detalles de un cliente
router.post("/getclients", getAllClientHandler); // obtiene y devuelve los datos principales de todos los clientes
// Histórico de procedimientos:
router.post("/newhistoricproc", postHistoricProcHandler); //  crea un registro en el histórico de procedimientos
// registrar el id de cliente y llamar por params
router.post("/gethistoricbyclient/:id", getHistoricByClientHandler); // obtiene y devuelve el histórico de los procedimientos. Filtra por client id
router.post("/gethistoricbyuser/:id", getHistoricByUsertHandler); // obtiene y devuelve el histórico de los procedimientos. Filtra por usuario
// Calendario:
router.post("/newcalendar", postCalendarHandler); //  crea un evento en calendario
router.put("/calendar/:id", putCalendarHandler); //  edita un evento en calendario
router.post("/deletecalendar/:id", deleteCalendarHandler); //  elimina un evento en calendario
router.post("/getcalendar", getCalendarHandler); // obtiene y devuelve todos los eventos en calendario. Filtra por fecha y por especialista por query
// Categorías de gastos:
router.post("/catgasto", postCatHandler); // crea una categoría
router.put("/catgastos/:id", putCatHandler); // edita una categoría
router.post("/deletecatgastos/:id", deleteCatHandler); //  elimina una categoría
router.post("/catgastos", getCatHandler); // obtiene y devuelve todas las categorías

// inventario:
router.get("/products", productHandlers.getAllProductsHandler);
router.get("/product-prices", productHandlers.getProductPrices);
router.post("/products", productHandlers.createProduct);
router.put("/products/:id", productHandlers.editProduct);
router.put("/products/:id/price", productHandlers.updateProductPrice);
router.get(
  "/products/:productId/prices-history",
  productHandlers.getProductPricesHistory
);

module.exports = router;
