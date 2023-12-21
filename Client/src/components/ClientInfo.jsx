import React, { useEffect, useState } from "react";

// hooks, routers, reducers:
import { IoBook } from "react-icons/io5";
import HistoryServices from "./HistoryServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import Loader from "./Loader.jsx";
import { clearClientId, getClientId } from "../redux/actions.js";

//icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from 'react-icons/io5';

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
import HistoryCalendar from "./HistoryCalendar.jsx";
const { CLIENTSPROFILES } = getParamsEnv();

const ClientInfo = () => {
    const params = useParams();
    const detailId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [showHistory, setShowHistory] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const token = useSelector(state => state?.token)
    const clientInfo = useSelector(state => state?.clientID)
     

    useEffect(() => {
      dispatch(getClientId(detailId, {token: token}))
      .then(() => {setLoading(false)})
    }, [detailId]);

    const handleGoBack = () => {
      dispatch(clearClientId());
      navigate(CLIENTSPROFILES);
    };

    const handleShowHistory = () => {
      setShowHistory(!showHistory)
      if (showCalendar === true){
        setShowCalendar(!showCalendar)
      }
    }

    const handleShowCalendar = () => {
      setShowCalendar(!showCalendar)
      if (showHistory === true){
        setShowHistory(!showHistory)
      }
    }

  return (
    <>
    {loading ? <Loader /> : ( 
      <section className="flex flex-col w-full items-center">
        <div className="relative border max-w-screen-sm h-fit mt-10 rounded overflow-hidden shadow-lg mx-auto">
          <div className="absolute top-0 right-0 mt-1 flex flex-col-reverse sm:flex sm:flex-row">
          <MdEdit
            className="h-8 w-8 hover:text-primaryPink hover:animate-bounce cursor-pointer delay-200 dark:text-darkText dark:hover:text-primaryPink"
          />
          <MdDelete
            className="h-8 w-8 hover:text-red-600 hover:animate-bounce cursor-pointer delay-200 dark:text-darkText dark:hover:text-red-600"
          />
          </div> 
          <IoMdArrowRoundBack onClick={handleGoBack} className="m-1 absolute top-0 left-0 cursor-pointer h-8 w-8 text-primaryPink"/>
          
        <div className="grid grid-1 place-items-center mt-5 sm:place-items-start sm:grid-cols-3 sm:p-5">
            <img
                className="w-40 shadow shadow-black rounded-full sm:col-span-1 sm:w-full"
                src={clientInfo.image}
                alt="client-photo"
            />
            <div className="m-4 sm:col-span-2 sm:ml-10 sm:mt-0 ">
                <p className=""> <span className="font-medium">Nombre:</span> {clientInfo.name}</p>
                <p className=""> <span className="font-medium">Apellido:</span> {clientInfo.lastName}</p>
                <p className=""><span className="font-medium">Email:</span> {clientInfo.email}</p>
                <p className=""> <span className="font-medium">ID:</span> {clientInfo.id_pers}</p>
                <p className=""><span className="font-medium">phoneNumber1:</span> {clientInfo.phoneNumber1}</p>
                <p className=""><span className="font-medium">phoneNumber2</span> {clientInfo.phoneNumber2}</p>
                <div className="flex flex-row gap-5 mt-2">
                    <button onClick={handleShowHistory} className="cursor-pointer rounded shadow-sm px-1 my-1 shadow-black bg-primaryPink">Procedimientos anteriores</button>
                    <button onClick={handleShowCalendar} className="cursor-pointer rounded shadow-sm px-1 my-1 shadow-black bg-primaryPink">Turnos anteriores</button>
                </div>
                <div className="flex gap-5 pt-2">
                </div>
            </div>
        </div>
    </div>
    {showHistory ? <HistoryServices history={clientInfo.HistoryServices}/>: null}
    {showCalendar ? <HistoryCalendar calendars={clientInfo.Calendars}/>: null}
    </section> )}
    </>
  );
};

export default ClientInfo;
