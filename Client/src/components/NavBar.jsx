import React from "react";

// assets and icons
import logo from "../assets/LauraVargas.png";
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

import getParamsEnv from "../functions/getParamsEnv.js";
import { Link } from "react-router-dom";  
const {ROOT}  = getParamsEnv();

const NavBar = () => {
  return (
    <nav className="bg-primaryPink h-20 flex pl-2 pr-10 justify-between items-center shadow-lg shadow-gray-300">
      <div>
        <img className="w-20 h-auto" src={logo} alt="logo" />
      </div>
      <div className="flex gap-2">
        <input
          className="rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-beige text-black w-64 h-7"
          type="text"
          placeholder="Ingrese su búsqueda... "
        />
      </div>
      <div className="flex gap-4 pointer-events:auto">
        <CiBellOn className="w-8 h-8" />
        <a href="">
          <GoPerson className="w-8 h-8" />
        </a>
        <Link to={ROOT}><IoExitOutline className="w-8 h-8" /></Link>
      </div>
    </nav>
  );
};

export default NavBar;
