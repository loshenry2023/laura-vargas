const {
  updateProduct,
} = require("../../../controllers/products-price/productController");

async function updateProductHandler(req, res) {
  try {
    const { productId } = req.params;
    const newData = req.body;
    const updatedProduct = await updateProduct(productId, newData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateProductHandler,
};
