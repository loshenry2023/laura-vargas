import React from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";


const Home = ({ user }) => {

  return (
    <>
      <NavBar />
      <SideBar />
      <p>HOME</p>
      {/* {user.rol === "superAdmin" ? (
        <p>superAdmin</p>
      ) : user.rol === "admin" ? (
        <p>admin</p>
      ) : user.rol === "specialist" ? (
        <p>specialist</p>
      ) : null} */}
    </>
  );
};

export default Home;