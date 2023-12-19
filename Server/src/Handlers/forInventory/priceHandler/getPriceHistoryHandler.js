const {
  getPriceHistory,
} = require("../../../controllers/products-price/priceHistoryController");

async function getPriceHistoryHandler(req, res) {
  try {
    const { productCode } = req.params;
    const priceHistory = await getPriceHistory(productCode);
    res.status(200).json(priceHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getPriceHistoryHandler,
};
