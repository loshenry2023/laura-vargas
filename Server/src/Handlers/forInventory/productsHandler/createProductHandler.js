const {
  createProduct,
} = require("../../../controllers/products-price/productController");

async function createProductHandler(req, res) {
  try {
    const { productData } = req.body;
    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProductHandler,
};
