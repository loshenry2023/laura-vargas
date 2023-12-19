const { Product, PriceHistory } = require("../../DB_connection");

async function addPriceIfDifferent(productCode, priceData) {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const product = await Product.findByPk(productCode);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }

    const lastPrice = await PriceHistory.findOne({
      where: { product_code: productCode },
      order: [["date_modification", "DESC"]],
      attributes: ["price"],
      raw: true,
    });

    if (
      !lastPrice ||
      parseFloat(lastPrice.price) !== parseFloat(priceData.price)
    ) {
      await PriceHistory.create(
        {
          product_code: productCode,
          price: priceData.price,
          date_modification: new Date(),
        },
        { transaction }
      );
    }

    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error("No se pudo agregar el precio si es diferente.");
  }
}

async function getPriceHistory(productCode) {
  try {
    const priceHistory = await PriceHistory.findAll({
      where: { product_code: productCode },
    });
    return priceHistory;
  } catch (error) {
    throw new Error("No se pudo obtener el historial de precios.");
  }
}
module.exports = {
  getPriceHistory,
  addPriceIfDifferent,
};
