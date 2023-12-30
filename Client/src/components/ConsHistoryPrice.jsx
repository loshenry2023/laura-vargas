import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPricesHistory } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import BarChartComponent from "./BarChartComponent";

import getParamsEnv from "../functions/getParamsEnv";
const { CONSUMABLES } = getParamsEnv();

import { IoClose } from "react-icons/io5";

import Loader from "./Loader";

const ConsHistoryPrice = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState(""); //para traer nombre
  const navigate = useNavigate();

  const pricesHistory = useSelector((state) => state?.pricesHistory);

  useEffect(() => {
    // Llamar a la acción para obtener el historial de precios y el nombre del producto
    dispatch(getProductPricesHistory(productId))
      .then((history) => {
        setLoading(false);

        // Obtener el nombre del producto desde la primera entrada del historial
        if (history.length > 0) {
          setProductName(history[0].productName);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [dispatch, productId]);

  const handleGoBack = () => {
    navigate(`${CONSUMABLES}`);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-20 bg-primaryPink opacity-95 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-4 text-white dark:text-darkText">
          Historial de Precios - {productName}
        </h1>
        <IoClose
          onClick={handleGoBack}
          className="cursor-pointer mt-2 w-5 h-5 dark:text-darkText mr-10"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="absolute top-1/4 left-0 w-full h-3/4 flex">
          {/* Contenedor de la tabla (1/3 del ancho) */}
          <div className="w-1/3 bg-white shadow rounded-lg p-6 dark:bg-darkBackground">
            <table className="'border border-black w-full text-sm text-left rtl:text-right text-black dark:text-beige dark:border-beige'">
              <thead className="bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-gre">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/2">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/2">
                    Fecha de Modificación
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricesHistory.map((history, index) => (
                  <tr
                    key={index}
                    className="text-xs hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                  >
                    <td className="px-6 py-4 w-1/2">{history.price}</td>
                    <td className="px-6 py-4 w-1/2">
                      {new Date(history.dateModification).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contenedor del gráfico (2/3 del ancho) */}
          <div className="w-2/3 ml-4">
            <BarChartComponent
              data={pricesHistory}
              colors={["#FFC8C8"]}
              name="Precio"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConsHistoryPrice;
