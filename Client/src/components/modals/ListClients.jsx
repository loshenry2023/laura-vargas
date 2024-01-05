import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../redux/actions";
import CreateClient from "./CreateClient";

//icons
import { IoPersonAddOutline } from "react-icons/io5";
import { IoClose } from 'react-icons/io5';
import ClientFilters from "../ClientFilters";
import ClientsTable from "../ClientsTable";
import Pagination from "../Pagination";


const ListClients = ({ setShowClientListModal, setChosenClient }) => {

  const token = useSelector((state) => state?.token);
  const clients = useSelector((state) => state?.clients);
  const count = useSelector((state) => state?.countClient);
  const dispatch = useDispatch();

  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("lastName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");

  const [showClientFormModal, setShowClientFormModal] = useState(false);
  const [activarNuevoCliente, setActivarNuevoCliente] = useState(false);


  const showCreateModal = () => {
    setShowClientFormModal(true)
  }

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
    )
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
    <section className="fixed top-0 left-0 flex justify-center w-full h-full" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
      <div className="flex flex-col rounded m-20 p-5 gap-5 w-1/2 mx-auto border border-white bg-white dark:bg-darkBackground">
        <div className="flex flex-row justify-between">
          <>
            <IoPersonAddOutline onClick={showCreateModal} className='h-6 w-6 mt-0.5 cursor-pointer dark:text-darkText' />
          </>
          <h2 className="text-xl dark:text-darkText">Elige un cliente</h2>
          <>
            <IoClose className='h-6 w-6 mt-0.5 cursor-pointer hover:scale-125 dark:text-darkText' onClick={() => setShowClientListModal(false)} />
          </>
        </div>
        <ClientFilters setNameOrLastName={setNameOrLastName} nameOrLastName={nameOrLastName} setAttribute={setAttribute} setOrder={setOrder} setPage={setPage} setSize={setSize} />
        <div>
          <ClientsTable setChosenClient={setChosenClient} setShowClientListModal={setShowClientListModal} clients={clients} />
        </div>
        <Pagination page={page} setPage={setPage} size={size} setSize={setSize} count={count} />
      </div>
      {showClientFormModal ?
        <CreateClient
          setChosenClient={setChosenClient}
          setShowClientListModal={setShowClientListModal}
          setShowClientFormModal={setShowClientFormModal}
          setActivarNuevoCliente={setActivarNuevoCliente}
        /> : null}
    </section>

  );
};

export default ListClients;
