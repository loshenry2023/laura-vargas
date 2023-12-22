import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getToken } from "../redux/actions";
import ClientsTable from "../components/ClientsTable";

const ClientsProfiles = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state?.token);
  const clients = useSelector((state) => state?.clients);
  const dispatch = useDispatch();

  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("lastName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");

  useEffect(() => {
    dispatch(
      getClients(
        nameOrLastName,
        attribute,
        order,
        page,
        size,
        createDateEnd,
        createDateStart,
        { token }
      )
    ).then(() => setLoading(false));
  }, [
    nameOrLastName,
    attribute,
    order,
    page,
    size,
    createDateEnd,
    createDateStart,
    token,
  ]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-row dark:bg-darkBackground">
        <SideBar />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col mt-10 gap-5 w-2/3 mx-auto">
            <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left">
              {" "}
              Clientes{" "}
            </h1>
            <section className="flex flex-col gap-2 mx-auto sm:flex sm:flex-row sm:gap-5 sm:w-full">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">Fecha inicial</label>
                  <input
                    onChange={(e) => {
                      setCreateDateStart(e.target.value ? `${e.target.value} 00:00:00` : "");
                    }}
                    type="date"
                    defaultValue=""
                    className="border rounded-md border-black px-2 text-sm dark:text-darkText dark:bg-darkPrimary dark:asd"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">Fecha final</label>
                  <input
                    onChange={(e) => {
                      setCreateDateEnd(e.target.value ? `${e.target.value} 23:59:59` : "");
                    }}
                    type="date"
                    defaultValue=""
                    className="border rounded-md border-black px-2 text-sm  dark:text-darkText dark:bg-darkPrimary"
                  />
                </div>
              </div>
            </section>
            <section className="flex flex-col items-start sm:w-full">
              <div className="flex flex-col items-center w-full gap-3 lg:flex-row lg:items-center lg:gap-3">
                <input
                  value={nameOrLastName}
                  onChange={(e) => {
                    setNameOrLastName(e.target.value);
                    setPage(0);
                  }}
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="w-full border border-black focus:outline-none focus:ring-1 focus:ring-grey px-1 text-sm dark:bg-darkPrimary dark:placeholder-darkText dark:text-darkText"
                />
                <select
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setPage(0);
                  }}
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
                >
                  <option value="asc"> -- Ordenar por -- </option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
                <select
                  onChange={(e) => {
                    setAttribute(e.target.value);
                    setPage(0);
                  }}
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
                >
                  <option value="lastName"> -- Ordenar por -- </option>
                  <option value="name">Nombre</option>
                  <option value="lastName">Apellido</option>
                  <option value="createdAt">Fecha de creación</option>
                </select>
              </div>
            </section>
            <section>
              <ClientsTable clients={clients} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsProfiles;