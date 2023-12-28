import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../redux/actions";
import ClientsTable from "../components/ClientsTable";

//icons
import { IoPersonAddOutline } from "react-icons/io5";
import CreateClient from '../components/modals/CreateClient';
import ClientFilters from "../components/ClientFilters";

const ClientsProfiles = () => {

  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state?.token);
  const clients = useSelector((state) => state?.clients);
  const countClient = useSelector((state) => state?.countClient);
  const dispatch = useDispatch();

  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("lastName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");
  
  const [showClientFormModal, setShowClientCreateModal] = useState(false);
  const [activarNuevoCliente, setActivarNuevoCliente] = useState(false);


  const handleClientFormModal = () => {
    setShowClientCreateModal(true);
  };

  const pagination = Math.ceil(countClient / size);

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
    activarNuevoCliente,
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
          <div className="flex flex-row gap-2">
            <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left">
              {" "}
              Clientes{" "}
            </h1>
            <IoPersonAddOutline className='h-6 w-6 mt-0.5 cursor-pointer dark:text-darkText' onClick={handleClientFormModal}/>
          </div>
          <ClientFilters setNameOrLastName={setNameOrLastName} nameOrLastName={nameOrLastName}  setAttribute={setAttribute}  setOrder={setOrder}  setPage={setPage}  setSize={setSize}/>
          <ClientsTable clients={clients} />
          <section className="flex flex-col items-center gap-5">
            <select
                name=""
                id=""
                defaultValue={10}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPage(0);
                }}
                className="shadow shadow-black rounded-md dark:text-darkText dark:bg-darkPrimary"
              >
                {" "}
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
                <div>
                <button
                  onClick={
                    page
                      ? () => {
                        setPage(page - 1);
                      }
                      : null
                  }
                  className="dark:text-darkText"
                >
                  {" "}
                  {"<"}
                </button>
                <span className="dark:text-darkText"> {page + 1} de {pagination} </span>
                <button
                  onClick={
                    page < pagination - 1
                      ? () => {
                        setPage(page + 1);
                      }
                      : null
                  }
                  className="dark:text-darkText"
                >
                  {">"}
                </button>
                </div>
            </section>
        </div>
          )}
        </div>
        {showClientFormModal ? (
          <CreateClient
          activarNuevoCliente={activarNuevoCliente}
          setShowClientCreateModal={setShowClientCreateModal}
          setActivarNuevoCliente={setActivarNuevoCliente}
          />
        ) : null}
    </div>
    
  );
};

export default ClientsProfiles;
