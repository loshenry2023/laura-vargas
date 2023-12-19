const {
  getAllProductsWithLatestPrice,
} = require("../../../controllers/products-price/productController");

async function getAllProductsWithLatestPriceHandler(req, res) {
  try {
    const products = await getAllProductsWithLatestPrice();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProductsWithLatestPriceHandler,
};
