const {
  deleteProduct,
} = require("../../../controllers/products-price/productController");

async function deleteProductHandler(req, res) {
  try {
    const { productId } = req.params;
    const message = await deleteProduct(productId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteProductHandler,
};
