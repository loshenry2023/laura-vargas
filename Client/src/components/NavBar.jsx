// assets and icons
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

// hooks, routers, reducers:
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { eraseNotification, getcalendarcount, setLogout } from "../redux/actions.js";

//functions
import capitalizeFirstLetter from "../functions/capitalizeFirstLetter.js"

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { ROOT, HOME, AGENDA, BRANCH } = getParamsEnv();

const NavBar = () => {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("darkMode")) ? JSON.parse(localStorage.getItem("darkMode")) : "light");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workingBranch = useSelector((state) => state.workingBranch);
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  const getCalendarCount = {
    branchID: workingBranch.id,
    userID: user.id,
    token
  }

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("darkMode"));
    if (storedTheme === "light" || !storedTheme) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    if (localStorage.getItem('dispatchPerformed') === null) {
      localStorage.setItem('dispatchPerformed', 'false');
    }

    if (localStorage.getItem('dispatchPerformed') === 'false') {
      dispatch(getcalendarcount(getCalendarCount))
      localStorage.setItem('dispatchPerformed', 'true');
      localStorage.setItem('showRed', 'true');
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

  const eraseNotifications = () => {
    dispatch(eraseNotification({}))
    localStorage.removeItem('showRed');
  }

  const changeBranch = () => {
    navigate(BRANCH)
    dispatch(eraseNotification({}))
    localStorage.removeItem('dispatchPerformed');
    localStorage.removeItem('showRed');
  }

  const showRed = localStorage.getItem('showRed');

  return (
    <>
      <nav
        className={`h-20 flex pl-2 pr-10 justify-between items-center shadow-md shadow-grey`}
        style={{ background: roleColor }}
      >
        <div className="flex flex-row items-center gap-5">
          {user.role !== "superAdmin" ?
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
          <span className="text-sm font-medium sm:text-lg">
            {" "}
            {user.name} {" "} {user.lastName} {" - "} {user.role === "superAdmin" ? "Admin General" : capitalizeFirstLetter(user.role)}  {" - "} {workingBranch.branchName}
          </span>
        </div>
        <div className="flex gap-4 items-center pointer-events:auto">
          {user.branches.length > 1 ? <TbStatusChange onClick={changeBranch} className="h-6 w-6 cursor-pointer" /> : null}
          {theme==="light" ?
          <MdDarkMode
            onClick={handleDarkMode}
            className="h-6 w-6 cursor-pointer"
          />
          :
          <MdLightMode
            onClick={handleDarkMode}
            className="h-6 w-6 cursor-pointer"
          />}
          <CiBellOn className="relative h-6 w-6" />
          {user.role === "superAdmin" || user.role === "admin" || appointments.count === 0 ? null :
            showRed && <span onClick={() => eraseNotifications()} className="text-sm flex flex-row items-center justify-center font-bold mx-auto my-auto absolute w-4 h-4 top-[40px] right-[76px] rounded-full bg-red-500 cursor-pointer"> {appointments.count}  </span>}
          <Link to={ROOT}>
            <IoExitOutline className="h-6 w-6 " onClick={handleLogout} />
          </Link>
        </div>
      </nav>
    </>
  );
};


export default NavBar;
