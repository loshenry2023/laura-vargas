import React from 'react'

//componentes
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

//icons
import { IoPersonAddOutline } from "react-icons/io5";

const Agenda = () => {

  return (
    <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
            <SideBar/>
            <div className="w-full h-screen flex flex-col mt-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]">
            <section className='flex flex-row gap-5'>
            <div>
              <IoPersonAddOutline className='h-6 w-6'/>
              </div>
              <select name="" id="" className="w-96 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value="">Tomas Bombau</option>
                <option value="">Ramiro Alet</option>
              </select>

              <select name="" id="" className="w-96 border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary">
                <option value="">Restrepo</option>
                <option value="">Villavicencio</option>
              </select>
            </section>
            <Calendar />
            <div>
              <button className='border border-black p-2 rounded-full bg-secondaryPink' disabled>Agregar Cita</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Agenda