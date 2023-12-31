import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ConsumablesTable from "../components/ConsumablesTable";
import NewConsumableModal from "../components/modals/newConsumableModal";

import getParamsEnv from "../functions/getParamsEnv";
const { NEWCONSUMABLE } = getParamsEnv();

import { FaPlus } from "react-icons/fa";

import Loader from "../components/Loader";
import "./loading.css";
import EditConsumableForm from "../components/EditConsumableForm";
import ToasterConfig from "../components/Toaster";
import { toast } from "react-hot-toast";

function Consumables() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showNewConsumableModal, setShowNewConsumableModal] = useState(false);
  const [newProductAdded, setNewProductAdded] = useState(false);
  const [editedProduct, setEditedProduct] = useState(false)

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [branch, setBranch] = useState("");
  const user = useSelector((state) => state?.user);
  const branches = user.branches;
  const [selectedBranch, setSelectedBranch] = useState("");
  const products = useSelector((state) => state?.products);
  const count = useSelector((state) => state?.count);
 

  useEffect(() => {
    if (user && user.branches && user.branches.length > 0) {
      setSelectedBranch(user.branches[0].branchName);
    }
  }, [user]);


  useEffect(() => {
    if (selectedBranch) {
      dispatch(
        getProducts(productName, selectedBranch, page, size, description)
      ).then(() => {
        setLoading(false);
      });
    }
  }, [productName, selectedBranch, page, size, description, newProductAdded, editedProduct]);

  const handleShowNewConsumableModal = () => {
    setShowNewConsumableModal(true);
    console.log("Modal abierto");
  };

  const handleNewProductAdded = () => {
    setNewProductAdded(!newProductAdded);
    
  };

  const handleProductEdited = () => {
    setEditedProduct(!editedProduct)
    
  }

  const totalPages = Math.ceil(count.count / size);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
          <SideBar />
          {user?.role === "superAdmin" || user?.role === "Admin" ? (
            loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col mt-10 gap-5 w-2/3 mx-auto">
                <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left">
                  Control de insumos
                </h1>
                <div className="ml-auto">
                  <button
                    onClick={handleShowNewConsumableModal}
                    className="bg-primaryPink hover:bg-secondaryPink text-white py-2 px-4 rounded border dark:bg-darkPrimary dark:border-darkText dark:hover:bg-gray-200 dark:hover:text-black"
                  >
                    <div className="flex items-center">
                      Nuevo Insumo <FaPlus className="ml-2" />
                    </div>
                  </button>
                </div>
                {showNewConsumableModal && (
                  <NewConsumableModal
                    onClose={() => {
                      setShowNewConsumableModal(false);
                      handleNewProductAdded();
                    }}
                    onProductAdd={handleNewProductAdded}
                  />
                )}
                <section className="flex flex-col items-start sm:w-full">
                  <div className="flex flex-col items-center w-full gap-3 lg:flex-row lg:items-center lg:gap-3">
                    <input
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setPage(0);
                      }}
                      type="text"
                      placeholder="Buscar por nombre..."
                      className="w-full border border-black focus:outline-none focus:ring-1 focus:ring-grey px-1 text-sm dark:bg-darkPrimary dark:placeholder-darkText dark:text-darkText"
                    />
                    <input
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setPage(0);
                      }}
                      type="text"
                      placeholder="Buscar por descripción..."
                      className="w-full border border-black focus:outline-none focus:ring-1 focus:ring-grey px-1 text-sm dark:bg-darkPrimary dark:placeholder-darkText dark:text-darkText"
                    />
                  </div>
                </section>
                <section>
                  <ConsumablesTable products={products} user={user} onClose={() => {
                      handleProductEdited();
                    }} />
                </section>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="border bg-primaryPink hover:bg-primaryPink text-white py-2 px-4 rounded dark:bg-darkPrimary dark:shadow-darkText dark:border-darkText  dark:hover:bg-gray-200 dark:hover:text-black cursor-pointer"
                  >
                    Anterior
                  </button>
                  <p className="dark:text-darkText">
                    Página {page + 1} de {totalPages}
                  </p>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                    className="border bg-primaryPink hover:bg-primaryPink text-white py-2 px-4 rounded dark:bg-darkPrimary dark:shadow-darkText dark:border-darkText dark:hover:bg-gray-200 dark:hover:text-black cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="flex w-full justify-center items-center">
              <img src="https://res.cloudinary.com/doyafxwje/image/upload/v1703981517/Access/denied_eylikh.png" alt="denied-access" className="h-96"/>
            </div>
          )}
        </div>
      </div>
      <ToasterConfig />
    </>
  );
}
export default Consumables;
