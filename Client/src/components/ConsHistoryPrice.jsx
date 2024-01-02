import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPricesHistory } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import BarChartComponent from "./BarChartComponent";

import { IoMdArrowRoundBack } from "react-icons/io";

import Loader from "./Loader";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

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
    navigate("/consumables");
  };

  return (
    <>
      <NavBar className=" w-full h-20 bg-primaryPink opacity-95 p-4 flex items-center justify-between"></NavBar>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-row">
          <SideBar />
          <div className="w-full flex flex-col dark:bg-darkBackground">
            <div>
              <h1 className="flex justify-center mt-10 text-xl font-semibold mb-10 text-black dark:text-darkText ">
                <span>
                  <IoMdArrowRoundBack
                    onClick={handleGoBack}
                    className="cursor-pointer mt-1.5 w-5 h-5 dark:text-darkText mr-2"
                  />
                </span>
                Historial de Precios
              </h1>
            </div>
            <div className="flex flex-row gap-20 p-6 dark:bg-darkBackground">
              <table className="w-1/3 h-fit border border-black text-sm text-left rtl:text-right text-black dark:text-beige dark:border-beige'">
                <thead className="bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-grey">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fecha de Modificación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricesHistory.map((history, index) => (
                    <tr
                      key={index}
                      className="text-xs justify-start items-start hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                    >
                      <td className="px-6 py-4 w-1/2 items-start">{history.price}</td>
                      <td className="px-6 py-4 w-1/2">
                        {new Date(history.dateModification).toLocaleString().split(",")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-2/3">
                <BarChartComponent
                  data={pricesHistory}
                  colors={["#FFC8C8"]}
                  name="Precio"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsHistoryPrice;
