import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { Link } from "react-router-dom";
import ToasterConfig from "./../components/Toaster";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ConsumablesTable from "../components/ConsumablesTable";

import { FaPlus } from "react-icons/fa";

import Loader from "../components/Loader";
import "./loading.css";

function Consumables() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

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
  }, [productName, selectedBranch, page, size, description]);

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
                <h1 className="text-xl text-center dark:text-beige sm:text-left">
                  Control de insumos
                </h1>
                <div className="ml-auto">
                  <Link to="/newconsumable">
                    <button className="bg-primaryPink hover:bg-secondaryPink text-white py-2 px-4 rounded">
                      <div className="flex items-center">
                        Nuevo Insumo <FaPlus className="ml-2" />
                      </div>
                    </button>
                  </Link>
                </div>
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
                  <ConsumablesTable products={products} user={user} />
                </section>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="bg-secondaryPink hover:bg-primaryPink text-white py-2 px-4 rounded"
                  >
                    Anterior
                  </button>
                  <p>
                    Página {page + 1} de {totalPages}
                  </p>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                    className="bg-secondaryPink hover:bg-primaryPink text-white py-2 px-4 rounded"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="text-center mt-10">
              <p>No tiene los permisos necesarios para ver el inventario.</p>
            </div>
          )}
        </div>
      </div>
      <ToasterConfig />
    </>
  );
}
export default Consumables;
