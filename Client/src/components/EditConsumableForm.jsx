import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, updateProductPrice } from "../redux/actions";
import { IoClose } from "react-icons/io5";
import editConsumableValidation from "../functions/editConsumableValidation";
import { toast, Toaster } from "react-hot-toast";

import getParamsEnv from "../functions/getParamsEnv";
const { CONSUMABLES } = getParamsEnv();

function EditConsumableForm() {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsState = useSelector((state) => state.products);
  const products = Array.isArray(productsState.rows) ? productsState.rows : [];

  const product = products.find((p) => p.code === parseInt(code, 10));

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [operation, setOperation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [initialAmount, setInitialAmount] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setDescription(product.description);
      setSupplier(product.supplier);
      setAmount(product.amount);
      setInitialAmount(product.amount);
      const currentPrice =
        product.PriceHistories.length > 0
          ? product.PriceHistories[0].price
          : "Precio no disponible";
      setNewPrice(currentPrice);
    }
  }, [product, products]);

  const handleUpdate = () => {
    const amountToAddOrSubtract = parseInt(amount, 10);

    if (operation === "" || operation === "Accion de Stock") {
      const updatedProductWithoutAmountChange = {
        ...(product || {}),
        productName,
        description,
        supplier,
        amount: initialAmount,
      };

      dispatch(editProduct(product.code, updatedProductWithoutAmountChange));
      toast.success(
        "Insumo modificado sin cambiar cantidad, no usaste ninguna operación."
      );

      if (newPrice !== product.price) {
        try {
          dispatch(updateProductPrice(product.code, newPrice));
        } catch (error) {
          console.error("Error updating product price:", error.message);
        }
      }

      return;
    }

    if (operation === "subtract" && initialAmount - amountToAddOrSubtract < 0) {
      setErrors({
        amount: "La cantidad solicitada no está disponible.",
      });
      toast.error("La cantidad solicitada no está disponible.");
      return;
    }

    // Validación adicional para la cantidad no sea menor a cero
    if (
      operation === "subtract" &&
      product.amount - amountToAddOrSubtract < 0
    ) {
      setErrors({
        amount: "La cantidad solicitada no está disponible.",
      });
      toast.error("La cantidad solicitada no está disponible.");
      return;
    }

    const updatedProduct = {
      ...(product || {}),
      productName,
      description,
      supplier,
      amount:
        operation === "add"
          ? product.amount + amountToAddOrSubtract
          : Math.max(0, product.amount - amountToAddOrSubtract),
    };

    const validationErrors = editConsumableValidation(product, updatedProduct);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(editProduct(product.code, updatedProduct));
    toast.success("Insumo modificado correctamente");

    if (newPrice !== product.price) {
      try {
        dispatch(updateProductPrice(product.code, newPrice));
      } catch (error) {
        console.error("Error updating product price:", error.message);
      }
    }
  };

  const handleGoBack = () => {
    navigate(`${CONSUMABLES}`);
  };

  return (
    <>
      <Toaster />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-95">
        <div className="container">
          <div className="w-full bg-white shadow rounded-lg p-6 md:mx-auto md:w-1/2 2xl:w-1/3 dark:bg-darkBackground">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">
                Editar insumo
              </h1>
              <IoClose
                onClick={handleGoBack}
                className="cursor-pointer mt-2 w-5 h-5 dark:text-darkText"
              />
            </div>
            <form>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Nombre:</label>
                <input
                  className="border border-black p-2 rounded w-full"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Descripción:</label>
                <input
                  className="border border-black p-2 rounded w-full"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Proveedor:</label>
                <input
                  className="border border-black p-2 rounded w-full"
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Cantidad:</label>
                <input
                  className="border border-black p-2 rounded w-full"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Operación:</label>
                <select
                  className="border border-black p-2 rounded w-full"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                >
                  <option value="">Accion de Stock</option>
                  <option value="add">Agregar Stock</option>
                  <option value="subtract">Quitar Stock</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="pl-1 text-sm font-bold">Precio:</label>
                <input
                  className="border border-black p-2 rounded w-full"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>

              {/* Mostrar errores */}
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500">
                  {Object.values(errors).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}

              <div className="flex justify-center mb-4 space-x-20 mt-6">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="h-10 w-[130px] cursor-pointer flex items-center justify-center shadow shadow-black bg-primaryPink text-black text-sm px-2 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                >
                  Actualizar insumo
                </button>
              </div>
            </form>
            {successMessage && (
              <div className="bg-blue-500 text-white p-4 rounded mt-4">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditConsumableForm;
