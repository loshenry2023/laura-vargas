const { Product, PriceHistory } = require("../../DB_connection");

async function createProduct(productData) {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("No se pudo crear el producto.");
  }
}

async function getAllProductsWithLatestPrice() {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: PriceHistory,
          attributes: ["price"],
          order: [["date_modification", "DESC"]], // Ordenar por fecha de modificación descendente para obtener el último precio
          limit: 1, // Obtener solo el último precio
        },
      ],
    });
    return products;
  } catch (error) {
    throw new Error(
      "No se pudieron obtener los productos con los últimos precios."
    );
  }
}

async function updateProduct(productId, newData) {
  try {
    const productToUpdate = await Product.findByPk(productId);
    if (productToUpdate) {
      await productToUpdate.update(newData);
      return productToUpdate;
    }
    throw new Error("Producto no encontrado.");
  } catch (error) {
    throw new Error("No se pudo actualizar el producto.");
  }
}

async function deleteProduct(productId) {
  try {
    const productToDelete = await Product.findByPk(productId);
    if (productToDelete) {
      await productToDelete.destroy();
      return "Producto eliminado correctamente.";
    }
    throw new Error("Producto no encontrado.");
  } catch (error) {
    throw new Error("No se pudo eliminar el producto.");
  }
}

module.exports = {
  createProduct,
  getAllProductsWithLatestPrice,
  updateProduct,
  deleteProduct,
};
