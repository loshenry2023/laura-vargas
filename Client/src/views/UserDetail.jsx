// hooks, routers, reducers:
import React from "react";

//Components
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import UserInfo from "../components/UserInfo";
import { useSelector } from "react-redux";

const UserDetail = () => {

  const user = useSelector(state => state?.user)


  return (
    //! falta componente para renderizar details
    <div>
      <NavBar />
      <div className="flex flex-row dark:bg-darkBackground">
        <SideBar/>
        {user?.role === "superAdmin" || user?.role === "admin" ? 
        <UserInfo/> : (
          <div className="flex flex-col gap-10 w-full justify-center items-center dark:bg-darkBackground">
          <div>
          <h1 className="text-3xl tracking-wide text-center font-fontTitle  dark:text-darkText">Acceso restringido </h1>
          <h5 className="text-2xl tracking-wide text-center text-gray-700 dark:text-darkText">Lo sentimos pero no tienes acceso a esta página.</h5>
          </div>
        <img src="https://cdn-icons-png.flaticon.com/512/345/345535.png" alt="denied-access" className="h-96 dark:invert"/>
      </div>)} 
      </div>
    </div>
  );
};

export default UserDetail;
