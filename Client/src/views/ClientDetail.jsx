import React from 'react'

// Components
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import ClientInfo from '../components/ClientInfo'

const ClientDetail = () => {

  return (
    <div>
    <NavBar />
    <div className="flex flex-row dark:bg-darkBackground">
      <SideBar /> 
      <ClientInfo />
    </div>
    </div>
  )
}

export default ClientDetail