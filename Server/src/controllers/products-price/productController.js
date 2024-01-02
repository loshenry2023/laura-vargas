const { Product, PriceHistory, Branch } = require("../../DB_connection");
const { Op } = require("sequelize");
const showLog = require("../../functions/showLog");

const getAllProductsWithLatestPrice = async (
  productName = "",
  supplier = "",
  amount = null,
  code = null,
  order = "asc", // Orden por defecto
  branchId = "",
  page = 0,
  size = 10,
  description = "",
  branch = "",
  productCode = ""
) => {
  try {
    const { count, rows } = await Product.findAndCountAll({
      include: [
        {
          model: Branch,
          where: { branchName: { [Op.iLike]: `%${branch}%` } },
          attributes: ["id", "branchName"],
        },
        {
          model: PriceHistory,
          order: [["date_modification", "DESC"]],
          attributes: ["price"],
          limit: 1,
        },
      ],
      attributes: [
        "code",
        "productName",
        "description",
        "supplier",
        "amount",
        "productCode",
      ],
      distinct: true,
      where: {
        [Op.and]: [
          // Filtro por nombre de producto
          { productName: { [Op.iLike]: `%${productName}%` } },
          // Filtro por proveedor
          { supplier: { [Op.iLike]: `%${supplier}%` } },
          // Filtro por cantidad
          amount !== null ? { amount: amount } : {},
          // Filtro por código
          code !== null ? { code: code } : {},
          // Filtro por código de producto
          productCode !== ""
            ? { productCode: { [Op.iLike]: `%${productCode}%` } }
            : {},
          // Filtro por descripción
          description !== ""
            ? { description: { [Op.iLike]: `%${description}%` } }
            : {},
        ],
      },
      order: [["code", order]],
      limit: size,
      offset: size * page,
    });
    return {
      count,
      rows,
    };
  } catch (err) {
    showLog(`getAllProductsWithLatestPrice -> getAllProducts error: ${err.message}`);
    return { message: err.message };
  }
};
async function getAllProductPrices(req, res) {
  try {
    const productsWithPrices = await Product.findAll({
      attributes: ["code", "productName"],
      include: [
        {
          model: PriceHistory,
          attributes: ["price"],
          order: [
            ["product_code", "ASC"],
            ["date_modification", "DESC"],
          ],
          limit: 1,
        },
      ],
    });

    const products = productsWithPrices.map((product) => ({
      code: product.code,
      productName: product.productName,
      price: product.PriceHistories.length
        ? product.PriceHistories[0].price
        : null,
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getProductPricesHistory(req, res) {
  try {
    const { productId } = req.params; // Obtener el ID del producto de la solicitud

    showLog(`getProductPricesHistory: ${productId}`);
    const productPricesHistory = await Product.findByPk(productId, {
      include: [
        {
          model: PriceHistory,
          attributes: ["price", "date_modification"],
          order: [["date_modification", "DESC"]], //ASC
        },
      ],
    });

    if (!productPricesHistory) {
      return res.status(404).json({ error: "Product not found" });
    }

    const pricesHistory = productPricesHistory.PriceHistories.map(
      (history) => ({
        price: history.price,
        dateModification: history.date_modification,
      })
    );

    // Fuerzo ordenamiento por fecha descendente:
    pricesHistory.sort((a, b) => {
      const dateA = new Date(a.dateModification);
      const dateB = new Date(b.dateModification);
      return dateB - dateA;
    });
    //    console.log("OK ", pricesHistory);


    res.json(pricesHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function createProduct(req, res) {
  try {
    const { price, branchId, productCode, ...productData } = req.body;

    // Verificar si el código de producto ya existe en la base de datos
    const existingProduct = await Product.findOne({ where: { productCode } });

    if (existingProduct) {
      return res.status(400).json({ error: "productCode already exists" });
    }

    const requiredFields = ["productName", "description", "supplier", "amount"];

    const missingFields = requiredFields.filter((field) => !productData[field]);

    if (!branchId || !price || !productCode || missingFields.length > 0) {
      const missing = [];
      if (!branchId) missing.push("branchId");
      if (!price) missing.push("price");
      if (!productCode) missing.push("productCode");
      missing.push(...missingFields);

      return res.status(400).json({
        error: `Missing fields: ${missing.join(", ")}`,
      });
    }

    const productBranch = await Branch.findByPk(branchId);
    if (!productBranch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const newProduct = await Product.create({ productCode, ...productData });
    const productPrice = await newProduct.createPriceHistory({ price });
    await newProduct.setBranch(productBranch);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const productToUpdate = await Product.findByPk(id);

    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    const allowedFields = [
      "productName",
      "description",
      "supplier",
      "amount",
      "price",
    ]; // Añade 'price' como un campo permitido para actualización
    allowedFields.forEach(async (field) => {
      if (req.body[field] !== undefined) {
        if (field === "price" && productToUpdate.price !== req.body[field]) {
          // Si el campo es 'price' y hay un cambio en el precio
          await PriceHistory.create({
            price: req.body[field],
            date_modification: new Date(),
          });
        }
        productToUpdate[field] = req.body[field];
      }
    });

    await productToUpdate.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProductPrice(req, res) {
  try {
    const { newPrice } = req.body;
    const productId = req.params.id; // Obtener productId del parámetro de ruta

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.price !== newPrice) {
      await PriceHistory.create({
        product_code: productId,
        price: newPrice,
        date_modification: new Date(),
      });

      // Actualiza el precio del producto
      product.price = newPrice;
      await product.save();
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllProductsWithLatestPrice,
  getAllProductPrices,
  createProduct,
  editProduct,
  updateProductPrice,
  getProductPricesHistory,
};
