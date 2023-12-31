// assets and icons
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";

// hooks, routers, reducers:
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/actions.js";

//functions
import capitalizeFirstLetter from "../functions/capitalizeFirstLetter.js"

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { ROOT, HOME, AGENDA, BRANCH } = getParamsEnv();

const NavBar = () => {
  const [theme, setTheme] = useState("light");
  const user = useSelector((state) => state.user);
  const workingBranch = useSelector((state) => state.workingBranch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("darkMode"));
    if (storedTheme === "light" || !storedTheme) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  let roleColor;
  if (user.role === "superAdmin") {
    roleColor = "linear-gradient(to right, #ffc8c8, #bf3d30)";
  } else if (user.role === "admin") {
    roleColor = "linear-gradient(to right, #ffc8c8, #FFDBC7)";
  } else if (user.role === "especialista") {
    roleColor = "#ffc8c8";
  }

  const handleLogout = () => {
    dispatch(setLogout(user.token));
    navigate(ROOT);
  };

  return (
    <>
      <nav
        className={`h-20 flex pl-2 pr-10 justify-between items-center shadow-md shadow-grey`}
        style={{ background: roleColor }}
      >
        <div className="flex flex-row items-center gap-5">
        {user.role === "especialista" ? 
          <Link to={AGENDA}>
            <img
              className="hidden sm:flex w-20"
              src={
                "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
              }
              alt="logo"
            />
          </Link> : 

           <Link to={HOME}>
          <img
            className="hidden sm:flex w-20"
            src={
              "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
            }
            alt="logo"
          />
        </Link>
          }
        </div>
        <div className="flex gap-4 ml:10 sm:ml-28 items-center pointer-events:auto ">
          <img
            src={user.image}
            alt="userPhoto"
            className="h-10 w-10 shadow-md shadow-black rounded-full"
          />
          <span className="font-medium text-md">
            {" "}
            {user.name} {" "} {user.lastName} {" - "} {user.role === "superAdmin" ? "Admin General" : capitalizeFirstLetter(user.role)}  {" - "} {workingBranch.branchName}
          </span>
          </div>
          <div className="flex gap-4 items-center pointer-events:auto">
          {user.branches.length > 1 ? <TbStatusChange  onClick={() => navigate(BRANCH)} className="h-6 w-6 cursor-pointer"/> : null}
          <MdDarkMode
            onClick={handleDarkMode}
            className="h-6 w-6 cursor-pointer"
          />
          <CiBellOn className="h-6 w-6" />
          <Link to={ROOT}>
            <IoExitOutline className="h-6 w-6 " onClick={handleLogout} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
