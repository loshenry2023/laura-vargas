//hooks, components, reducer
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//icons
import { FaCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiFingernail } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { TfiMenu } from "react-icons/tfi";
import { MdWorkHistory } from "react-icons/md";

// Variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { AGENDA, USERPROFILES, CONSUMABLES, CLIENTSPROFILES, SPECIALISTMONITORING } = getParamsEnv();

const IconWithTooltip = ({ to, iconName, tooltipText }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
    setIsHovered(false);
  };

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative ${isHovered ? "text-white" : ""}`}>
        {renderIcon(iconName)}
        {tooltipVisible && (
          <span className="tooltip absolute bg-secondaryPink text-black rounded p-2 opacity-100 transition-opacity ml-[50px] mt-[-30px] dark:bg-darkPrimary dark:text-darkText">
            {tooltipText}
          </span>
        )}
      </div>
    </Link>
  );
};

const renderIcon = (iconName) => {
  switch (iconName) {
    case "profile":
      return <ImProfile className="w-6 h-6 dark:text-beige" />;
    case "calendar":
      return <FaCalendar className="w-6 h-6 dark:text-beige" />;
    case "userGroup":
      return <HiMiniUserGroup className="w-6 h-6 dark:text-beige" />;
    case "location":
      return <FaLocationPin className="w-6 h-6 dark:text-beige" />;
    case "fingernail":
      return <GiFingernail className="w-6 h-6 dark:text-beige" />;
    case "analytics":
      return <IoMdAnalytics className="w-6 h-6 dark:text-beige" />;
    case "Consumables":
      return <TfiMenu className="w-6 h-6 dark:text-beige" />;
    case "specialistmonitoring":
      return <MdWorkHistory className="w-6 h-6 dark:text-beige" />;
    default:
      return null;
  }
};

const SideBar = () => {
  const dynamicMinHeight = `calc(100vh - 80px)`;
  const user = useSelector(state => state?.user)

  return (
    <div
      style={{ minHeight: dynamicMinHeight }}
      className="bg-secondaryPink w-14 flex flex-col items-center gap-8 pointer-events-auto shadow-md shadow-grey dark:shadow-gray-100 dark:bg-darkPrimary dark:text-beige relative"
    >
      <hr className="w-14 h-[1px] bg-beige border-0" />
      {user.role === "especialista" ? (
        <>
        <IconWithTooltip to={AGENDA} iconName="calendar" tooltipText="Agenda" />
        <IconWithTooltip to={CLIENTSPROFILES} iconName="userGroup" tooltipText="Clientes" />
        </>
      ) : (
        <>
        <IconWithTooltip to={USERPROFILES} iconName="profile" tooltipText="Plantilla" />
        <IconWithTooltip to={CLIENTSPROFILES} iconName="userGroup" tooltipText="Clientes" />
        <IconWithTooltip to={AGENDA} iconName="calendar" tooltipText="Agenda" />
        <IconWithTooltip to="#" onClick={() => handleIconClick("location")} iconName="location" tooltipText="Ubicacion" />
        <IconWithTooltip to="#" onClick={() => handleIconClick("fingernail")} iconName="fingernail" tooltipText="Servicios" />
        <IconWithTooltip to="#" onClick={() => handleIconClick("analytics")} iconName="analytics" tooltipText="Estadísticas" />
        <IconWithTooltip to={CONSUMABLES} iconName="Consumables" tooltipText="Insumos" />
        <IconWithTooltip to={SPECIALISTMONITORING} iconName="specialistmonitoring" tooltipText="Seguimiento especialistas" />
        </>
      )
    }
    </div>
  );
};

export default SideBar;