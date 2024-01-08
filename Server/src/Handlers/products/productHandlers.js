const productController = require("../../controllers/products-price/productController");
const showLog = require("../../functions/showLog");
const checkToken = require('../../functions/checkToken');

const getAllProductsHandler = async (req, res) => {
  try {
    const {
      productName,
      description,
      code,
      amount,
      order,
      page,
      size,
      branch,
      productCode,
      token,
      supplier = "",
      attribute = "",
    } = req.body;

    // Verifico token:
    if (!token) { throw Error("Se requiere token"); }
    const checked = await checkToken(token);
    if (!checked.exist) {
      showLog(checked.mensaje);
      return res.status(checked.code).send(checked.mensaje);
    }

    // console.log("----------------------------");
    // console.log("productName ", productName);
    // console.log("supplier ", supplier);
    // console.log("amount ", amount);
    // console.log("code ", code);
    // console.log("attribute ", attribute);

    // console.log("order ", order);
    // console.log("page ", page);
    // console.log("size ", size);
    // console.log("description ", description);
    // console.log("branch ", branch);
    // console.log("productCode ", productCode);
    // console.log("----------------------------");

    const products = await productController.getAllProductsWithLatestPrice(
      productName,
      supplier,
      amount,
      code,
      attribute,
      order,
      page,
      size,
      description,
      branch,
      productCode
    );

    return res.status(200).json(products);
  } catch (err) {
    showLog(`getAllProductsHandler - Error al obtener datos de productos -> ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

function getProductPrices(req, res) {
  // Lógica para obtener todos los precios de cada producto
  productController.getAllProductPrices(req, res);
}

function createProduct(req, res) {
  // Lógica para crear un nuevo producto
  productController.createProduct(req, res);
}

function editProduct(req, res) {
  // Lógica para editar un producto existente
  productController.editProduct(req, res);
}

function updateProductPrice(req, res) {
  // Lógica para cambiar el precio de un producto
  productController.updateProductPrice(req, res);
}

function getProductPricesHistory(req, res) {
  // Lógica para cambiar el precio de un producto
  productController.getProductPricesHistory(req, res);
}

module.exports = {
  getAllProductsHandler,
  getProductPrices,
  createProduct,
  editProduct,
  updateProductPrice,
  getProductPricesHistory,
};
