import React from "react";
import { FaCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiFingernail } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-secondaryPink w-20 min-h-[calc(100vh-80px)] flex flex-col items-center gap-8 pointer-events:auto shadow-lg shadow-gray-300">
      <hr className="w-14 h-[1px] bg-beige border-0"/>
      <a href="">
        <FaCalendar className="w-6 h-6 hover:text-beige" />
      </a>
      <Link to="/userprofiles">
        <ImProfile className="w-6 h-6 hover:text-beige" />
      </Link>
      <a href="">
        <FaLocationPin className="w-6 h-6 hover:text-beige" />
      </a>
      <a href=""> 
        <GiFingernail className="w-6 h-6 hover:text-beige" />
      </a>
      <a href="">
        <HiMiniUserGroup className="w-6 h-6 hover:text-beige" />
      </a>
      <a href="">
        <IoMdAnalytics className="w-6 h-6 hover:text-beige" />
      </a>
    </div>
  );
};

export default SideBar;
