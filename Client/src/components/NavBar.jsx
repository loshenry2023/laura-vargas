
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

  let roleColor;
  if (user.role === "superAdmin") {
    roleColor = "linear-gradient(to right, #e59494, #C21807)";
  } else if (user.role === "admin") {
    roleColor = "linear-gradient(to right, #e59494, #7676cc)";
  } else if (user.role === "user") {
    roleColor ="#e59494";
  }

  const handleLogout =  () => {
    dispatch(setLogout(user.token))
    navigate("/login")

    
  }
  return (
    <>
    <nav
      className={`h-20 flex pl-2 pr-10 justify-between items-center shadow-md shadow-grey dark:shadow-gray-100 dark:text-beige`}
      style={{ background: roleColor }}
    >
      <div>
        <Link to={HOME}>
          <img
            className="w-20"
            src={"https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"}
            alt="logo"
          /> 
        </Link>
      </div>
     
      <div className="flex gap-4 pointer-events:auto ">
      <div className="mt-[-5px]">
        <span className="flex items-center">
          <img
            src={user.image}
            alt="userPhoto"
            className="h-10 w-10 cursor-pointer dark:text-white border border-black rounded-full"
          />
          <p className="pb-1 ml-2 font-xl"> {user.role}</p>
        </span>
      </div>
        <MdDarkMode onClick={handleDarkMode} className="h-6 w-6 cursor-pointer dark:text-white" />
        <CiBellOn className="h-6 w-6" />
        <Link to={ROOT}>
        <IoExitOutline className="h-6 w-6" onClick={handleLogout}/>
        </Link>
      </div>
    </nav>
    </>
  );
};

export default NavBar;
