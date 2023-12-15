
// assets and icons
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";

// hooks, routers, reducers:
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/actions.js";

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { ROOT, HOME } = getParamsEnv();

const NavBar = () => {
  const [theme, setTheme] = useState('dark')
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    if(theme === 'light'){document.documentElement.classList.remove('dark')}
    else{document.documentElement.classList.add('dark')}
  }

  const handleLogout =  () => {
    dispatch(setLogout(user.token))
    navigate("/login")

    
  }
  return (
    <nav className="bg-secondaryPink h-20 flex pl-2 pr-10 justify-between items-center shadow-md shadow-grey dark:shadow-gray-100 dark:bg-darkPrimary dark:text-beige">
      <div>
        <Link to={HOME}>
          <img className="w-20" src={"https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"} alt="logo"/>
        </Link>
      </div>
        <h1 className="justify-self-start capitalize font-semibold ">{user.name} - {user.role}</h1>
      <div className="flex gap-4 pointer-events:auto">
      <MdDarkMode onClick={handleDarkMode} className="h-6 w-6 cursor-pointer dark:text-white"/>
      {/* <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input onClick={handleDarkMode} type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-grey appearance-none cursor-pointer"/>
        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-grey cursor-pointer"></label>
      </div> */}
        <CiBellOn className="h-6 w-6" />
        <GoPerson className="h-6 w-6 cursor-pointer" />
        <Link to={ROOT}>  
          <IoExitOutline className="h-6 w-6" onClick={handleLogout}/>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
