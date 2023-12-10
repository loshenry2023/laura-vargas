
// assets and icons
import logo from "../assets/LauraVargas.png";
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

// hooks, routers, reducers:
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { ROOT } = getParamsEnv();

const NavBar = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="bg-primaryPink h-20 flex pl-2 pr-10 justify-between items-center shadow-lg shadow-gray-300">
      <div>
        <Link to="/home">
          <img className="w-20 h-auto" src={logo} alt="logo" />
        </Link>
      </div>
        <h1 className="justify-self-start capitalize font-semibold ">{user.name} - {user.role}</h1>
      {/* <div className="flex gap-2">
        <input
          className="rounded-xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-beige text-black w-64 h-6"
          type="text"
          placeholder="Ingrese su búsqueda... "
        />
      </div> */}
      <div className="flex gap-4 pointer-events:auto">
        <CiBellOn className="h-6 w-6" />
        <GoPerson className="h-6 w-6 cursor-pointer" />
        <Link to={ROOT}>  
          <IoExitOutline className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
