// assets and icons
import { CiBellOn } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";

// hooks, routers, reducers:
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/actions.js";

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { ROOT, HOME } = getParamsEnv();

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
    navigate("/login");
  };
  return (
    <>
      <nav
        className={`h-20 flex pl-2 pr-10 justify-between items-center shadow-md shadow-grey`}
        style={{ background: roleColor }}
      >
        <div className="flex flex-row items-center gap-5">
          <Link to={HOME}>
            <img
              className="w-20"
              src={
                "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
              }
              alt="logo"
            />
          </Link>
          {<h2 className="text-xl tracking-wider mt-2">Sede: {workingBranch.branchName}</h2>}
        </div>
        <div className="flex gap-4 items-center pointer-events:auto ">
          <img
            src={user.image}
            alt="userPhoto"
            className="h-10 w-10 shadow-md shadow-black  rounded-full"
          />
          <span className="font-medium">
            {" "}
            {user.name} {" "} {user.lastName} {" - "} {user.role}
          </span>
          <MdDarkMode
            onClick={handleDarkMode}
            className="h-6 w-6 cursor-pointer "
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
