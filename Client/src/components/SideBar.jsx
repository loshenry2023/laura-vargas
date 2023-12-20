import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIcon } from "../redux/actions";
import { FaCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiFingernail } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

  //Variables de entorno
  import getParamsEnv from "../functions/getParamsEnv.js";
  const { AGENDA, USERPROFILES, CLIENTDETAIL } = getParamsEnv();
  

const SideBar = () => {
  const dispatch = useDispatch();
  const selectedIcon = useSelector((state) => state.selectedIcon);
  const dynamicMinHeight = `calc(100vh - 80px)`;

  const handleIconClick = (iconName) => {
    dispatch(setIcon(iconName));
  };


  return (
    <div style={{ minHeight: dynamicMinHeight }}
      className="bg-secondaryPink w-14 flex flex-col items-center gap-8 pointer-events-auto shadow-md shadow-grey dark:shadow-gray-100 dark:bg-darkPrimary dark:text-beige">
      <hr className="w-14 h-[1px] bg-beige border-0" />
      <Link to={USERPROFILES}>
        <ImProfile className={`w-6 h-6  dark:text-beige ${selectedIcon === "profile" ? "text-black" : "text-black hover:text-beige"}`} />
      </Link>
      <Link to={AGENDA}>
        <FaCalendar className={`w-6 h-6 dark:text-beige ${selectedIcon === "calendar" ? "text-black" : "text-black hover:text-beige"}`} />
      </Link>
      <Link to={CLIENTDETAIL}>
        <HiMiniUserGroup className={`w-6 h-6  dark:text-beige ${selectedIcon === "userGroup" ? "text-black" : "text-black hover:text-beige"}`} />
      </Link>
      <a href="#" onClick={() => handleIconClick("location")}>
        <FaLocationPin className={`w-6 h-6  dark:text-beige ${selectedIcon === "location" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <a href="#" onClick={() => handleIconClick("fingernail")}>
        <GiFingernail className={`w-6 h-6  dark:text-beige ${selectedIcon === "fingernail" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <a href="#" onClick={() => handleIconClick("analytics")}>
        <IoMdAnalytics className={`w-6 h-6  dark:text-beige ${selectedIcon === "analytics" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
    </div>
  );
};

export default SideBar;