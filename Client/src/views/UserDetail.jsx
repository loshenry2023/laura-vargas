// hooks, routers, reducers:
import React from "react";

//Components
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import UserInfo from "../components/UserInfo";

const UserDetail = () => {

  return (
    //! falta componente para renderizar details
    <div>
      <NavBar />
      <div className="flex flex-row h-screen dark:bg-darkBackground">
        <SideBar/>
        <UserInfo/>
      </div>
    </div>
  );
};

export default UserDetail;
