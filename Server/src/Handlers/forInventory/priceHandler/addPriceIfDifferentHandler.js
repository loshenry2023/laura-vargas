const {
  addPriceIfDifferent,
} = require("../../../controllers/products-price/priceHistoryController");

async function addPriceIfDifferentHandler(req, res) {
  try {
    const { productCode, priceData } = req.body; //  productCode y priceData tiene que venir en el body
    await addPriceIfDifferent(productCode, priceData);
    res.status(200).json({ message: "Precio agregado si es diferente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addPriceIfDifferentHandler,
};
