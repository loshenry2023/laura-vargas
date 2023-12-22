

//componentes
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader';

//hooks, reducer, actions
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getClients, getServices, getToken, getUsers } from '../redux/actions';
import React, { useEffect, useState } from 'react'

//icons
import { IoPersonAddOutline } from "react-icons/io5";
import CreateClient from '../components/modals/CreateClient';


const Agenda = () => {

  const [showClientFormModal, setShowClientFormModal] = useState(false);
  const [activarNuevoCliente, setActivarNuevoCliente] = useState(false);
  const [loading, setLoading] = useState(true)

  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const branches = useSelector((state) => state?.branches);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const services = useSelector((state) => state?.services);
  const clients = useSelector((state) => state?.clients);
  const users = useSelector((state) => state?.users);
  const dispatch = useDispatch()

  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [branch, setBranch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [role, setRole] = useState("");
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");

  const handleClientFormModal = () => {
    setShowClientFormModal(true);
  };

useEffect(() => {
    dispatch(getToken(token))
    dispatch(getServices({ token: token }))
    dispatch(getClients({ token: token }))
    dispatch(
      getUsers(
        nameOrLastName,
        attribute,
        order,
        page,
        size,
        branch,
        specialty,
        role,
        createDateEnd,
        createDateStart,
        { token: token }
      )
    )
    .then(() => setLoading(false))
}, [activarNuevoCliente])

  return (
    <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
            <SideBar/>
            {loading ? <Loader /> : (
            <div className="w-full flex flex-col my-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]">
            <h1 className='items-start text-2xl underline underline-offset-4 tracking-wide font-fontTitle dark:text-beige sm:text-left'>Agenda</h1>
            <section className='flex flex-col place-items-center gap-5 mb-10 md:flex-row'>
              <div>
                <IoPersonAddOutline className='h-6 w-6 cursor-pointer dark:text-darkText' onClick={handleClientFormModal}/>
              </div>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
              <option value=""> -- Clientes-- </option>
              {clients.map((client, index)=> {
                  const nombreApellido = `${client.name} ${client.lastName}`
                  return (
                    <option key={index} value={nombreApellido}>{nombreApellido}</option>
                  )
                })}
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value=""> {workingBranch.branchName} </option>
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
              <option value=""> -- Procedimientos-- </option>
              {services.map((service, index)=> {
                  return (
                    <option key={index} value={service.serviceName}>{service.serviceName}</option>
                  )
                })}
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value=""> -- Especialista-- </option>
                {users.map((user, index)=> {
                  if(user.role === "especialista"){ 
                    return (
                      <option key={index} value={user.serviceName}>{user.name} {user.lastName}</option>
                  )} else {
                    null
                  }
                })}
              </select>
            </section>
            <Calendar />
            <div>
              <button className='rounded mt-10 px-6 py-2 cursor-pointer bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600' disabled>Agregar Cita</button>
            </div>
            </div>)}
        </div>
        {showClientFormModal ? (
                <CreateClient
                setShowClientFormModal={setShowClientFormModal}
                setActivarNuevoCliente={setActivarNuevoCliente}
                />
              ) : null}
    </div>
  )
}

export default Agenda