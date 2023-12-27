import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import DateDetail from '../components/DateDetail'

const SpecialistDate = () => {

  const id = useParams()


  return (
    <div>
      <div>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
          <SideBar />
          <DateDetail />
        </div>
      </div>
    </div>
  )
}

export default SpecialistDate
