

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
import { FaPlusCircle } from "react-icons/fa";
import ListClients from '../components/modals/ListClients';

const Agenda = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const token = useSelector((state) => state?.token);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const services = useSelector((state) => state?.services);
  const users = useSelector((state) => state?.users);
  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(999999999999999);
  const [branch, setBranch] = useState("");
  const [specialty, setSpecialty] = useState("noneSpecialty");
  const [role, setRole] = useState("");
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");
  const [chosenClient, setChosenClient] = useState({name: "Elija", lastName:"cliente"});

  const [showClientListModal, setShowClientListModal] = useState(false);

  useEffect(() => {
    dispatch(getToken(token))
    dispatch(getServices({ token: token }))
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
  }, [specialty])
  return (
    <div>
      <NavBar />
      <div className="flex flex-row dark:bg-darkBackground">
        <SideBar />
        {loading ? <Loader /> : (
          <div className="w-full flex flex-col m-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]">
            <h1 className='items-start text-2xl underline underline-offset-4 tracking-wide font-fontTitle dark:text-beige sm:text-left'>Agenda</h1>
            <section className='flex flex-col flex-wrap items-center justify-center gap-5 mb-10 md:flex-row'>
              <div className='mt-5 flex flex-row gap-5 sm:mt-0'>
                <FaPlusCircle className='mt-1.5 cursor-pointer dark:text-darkText' onClick={() => setShowClientListModal(true)} />
                <input name="" id="" placeholder={`${chosenClient.name} ${chosenClient.lastName}`} disabled className=" resize-y border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"/> 
              </div>
              <select name="" id="" className=" border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
              <option value=""> {workingBranch.branchName} </option>
              </select>
              <select name="" id="" className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                onChange={(e) => { setSpecialty(e.target.value) }}>
                <option value="noneSpecialty" > Procedimientos </option>
                {services.map((service, index) => {
                  return (
                    <option key={index} value={service.Specialties[0].specialtyName}>{service.serviceName}</option>

                  )
                })}
              </select>
              <select name="" id="" className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value=""> -- Especialista-- </option>
                {users.map((user, index) => {
                  if (user.role === "especialista") {
                    return (
                      <option key={index} value={user.serviceName}>{user.name} {user.lastName}</option>
                    )
                  } else {
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
          {showClientListModal ? (
            <ListClients setChosenClient={setChosenClient} setShowClientListModal={setShowClientListModal}/>
              ) : null}
        </div>
    </div>
  )
}

export default Agenda