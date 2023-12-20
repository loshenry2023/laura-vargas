

//componentes
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader';

//hooks, reducer, actions
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getToken } from '../redux/actions';
import React, { useEffect, useState } from 'react'

//icons
import { IoPersonAddOutline } from "react-icons/io5";
import CreateClient from '../components/modals/CreateClient';


const Agenda = () => {

  const [showClientFormModal, setShowClientFormModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const token = useSelector((state) => state?.token);
  const branches = useSelector((state) => state?.branches);
  const dispatch = useDispatch()

  const handleClientFormModal = () => {
    setShowClientFormModal(true);
  };

useEffect(() => {
    dispatch(getToken(token))
    dispatch(getBranches({ token: token }))
    .then(() => setLoading(false))
}, [])

  return (
    <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
            <SideBar/>
            {loading ? <Loader /> : (
            <div className="w-full h-screen flex flex-col mt-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]">
            <section className='flex flex-col gap-5 md:flex-row'>
              <div>
                <IoPersonAddOutline className='h-6 w-6 cursor-pointer dark:text-darkText' onClick={handleClientFormModal}/>
              </div>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
              <option value=""> -- Clientes-- </option>
                <option value="">Tomas Bombau</option>
                <option value="">Ramiro Alet</option>
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                {branches.map((branch, index)=> {
                  console.log(branch)
                  return (
                    <option key={index} value={branch.branchName}>{branch.branchName}</option>
                  )
                })}
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
              <option value=""> -- Procedimientos-- </option>
                <option value="">Micropigmentación</option>
                <option value="">Diseño y depilación</option>
                <option value="">Diseño, depilación y henna</option>
                <option value="">Henna</option>
                <option value="">Laminado</option>
                <option value="">Retoque Micropigmentación</option>
                <option value="">Depilación en las cejas</option>
                <option value="">Lifting</option>
              </select>
              <select name="" id="" className="w-40 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value=""> -- Especialista-- </option>
                <option value=""> Especialista 1 </option>
                <option value=""> Especialista 2 </option>
                <option value=""> Especialista 3 </option>
              </select>
            </section>
            <Calendar />
            <div>
              <button className='rounded px-6 py-2 cursor-pointer bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600' disabled>Agregar Cita</button>
            </div>
            </div>)}
        </div>
        {showClientFormModal ? (
                <CreateClient
                setShowClientFormModal={setShowClientFormModal}
                />
              ) : null}
    </div>
  )
}

export default Agenda