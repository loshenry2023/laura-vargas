import React, { useState } from 'react'

//componentes
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

//icons
import { IoPersonAddOutline } from "react-icons/io5";
import CreateClient from '../components/modals/CreateClient';

const Agenda = () => {

  const [showClientFormModal, setShowClientFormModal] = useState(false);

  const handleClientFormModal = () => {
    setShowClientFormModal(true);
  };

  return (
    <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
            <SideBar/>
            <div className="w-full h-screen flex flex-col mt-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]">
            <section className='flex flex-col gap-5 md:flex-row'>
              <div>
                <IoPersonAddOutline className='h-6 w-6 cursor-pointer' onClick={handleClientFormModal}/>
              </div>
              <select name="" id="" className="w-60 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value="">Tomas Bombau</option>
                <option value="">Ramiro Alet</option>
              </select>

              <select name="" id="" className="w-60 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value="">Restrepo</option>
                <option value="">Villavicencio</option>
              </select>
            </section>
            <Calendar />
            <div>
              <button className='rounded px-6 py-2 cursor-pointer bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600' disabled>Agregar Cita</button>
            </div>
            </div>
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