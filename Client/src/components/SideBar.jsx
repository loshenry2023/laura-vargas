import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIcon } from "../redux/actions";
import { FaCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiFingernail } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();
  const selectedIcon = useSelector((state) => state.selectedIcon);

  const handleIconClick = (iconName) => {
    dispatch(setIcon(iconName));
  };

  return (
    <div className="bg-secondaryPink w-20 min-h-[calc(100vh-80px)] flex flex-col items-center gap-8 pointer-events-auto shadow-lg shadow-gray-300">
      <hr className="w-14 h-[1px] bg-beige border-0" />
      <a href="#" onClick={() => handleIconClick("calendar")}>
        <FaCalendar className={`w-6 h-6 ${selectedIcon === "calendar" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <Link to="/userprofiles" onClick={() => handleIconClick("profile")}>
        <ImProfile className={`w-6 h-6 ${selectedIcon === "profile" ? "text-black" : "text-black hover:text-beige"}`} />
      </Link>
      <a href="#" onClick={() => handleIconClick("location")}>
        <FaLocationPin className={`w-6 h-6 ${selectedIcon === "location" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <a href="#" onClick={() => handleIconClick("fingernail")}>
        <GiFingernail className={`w-6 h-6 ${selectedIcon === "fingernail" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <a href="#" onClick={() => handleIconClick("userGroup")}>
        <HiMiniUserGroup className={`w-6 h-6 ${selectedIcon === "userGroup" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
      <a href="#" onClick={() => handleIconClick("analytics")}>
        <IoMdAnalytics className={`w-6 h-6 ${selectedIcon === "analytics" ? "text-black" : "text-black hover:text-beige"}`} />
      </a>
    </div>
  );
};

export default SideBar;