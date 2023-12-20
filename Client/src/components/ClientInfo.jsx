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

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { CLIENTSPROFILES } = getParamsEnv();

const ClientInfo = () => {
    const params = useParams();
    const detailId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [showHistory, setShowHistory] = useState(false)
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

    const asd = [
      {
        id: "dasdasdasd",
        date: "2023-12-19T03:00:00.000Z",
        serviceName: "Depilación",
        price: "10000",
        imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
        conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        paymentMethodName: "Efectivo",
        attendedBy: "Jorge",
      },
      {
        id: "dasdasdasd",
        date: "2023-12-19T03:00:00.000Z",
        serviceName: "Depilación",
        price: "10000",
        imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
        conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        paymentMethodName: "Efectivo",
        attendedBy: "Jorge",
      },
      {
        id: "dasdasdasd",
        date: "2023-12-19T03:00:00.000Z",
        serviceName: "Depilación",
        price: "10000",
        imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
        conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        paymentMethodName: "Efectivo",
        attendedBy: "Jorge",
      },
      {
        id: "dasdasdasd",
        date: "2023-12-19T03:00:00.000Z",
        serviceName: "Depilación",
        price: "10000",
        imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
        conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        paymentMethodName: "Efectivo",
        attendedBy: "Jorge",
      },
      {
        id: "dasdasdasd",
        date: "2023-12-19T03:00:00.000Z",
        serviceName: "Depilación",
        price: "10000",
        imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
        conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
        branchName: "Restrepo",
        paymentMethodName: "Efectivo",
        attendedBy: "Jorge",
      }
    ]

  return (
    <>
    {loading ? <Loader /> : ( 
      <section className="flex flex-col w-full items-center">
        <div className="border max-w-screen-sm h-fit mt-10 rounded overflow-hidden shadow-lg mx-auto">
        <div className="grid grid-1 place-items-center sm:place-items-start sm:grid-cols-3 sm:m-10">
            <img
                className="shadow shadow-black rounded-full sm:col-span-1 sm:w-full"
                src={clientInfo[0].image}
                alt="client-photo"
            />
            <div className="m-4 sm:col-span-2 sm:ml-10 sm:mt-0">
                <p className=""> <span className="font-medium">Nombre:</span> {clientInfo[0].name}</p>
                <p className=""> <span className="font-medium">Apellido:</span> {clientInfo[0].lastName}</p>
                <p className=""><span className="font-medium">Email:</span> {clientInfo[0].email}</p>
                <p className=""> <span className="font-medium">ID:</span> {clientInfo[0].id_pers}</p>
                <p className=""><span className="font-medium">phoneNumber1:</span> {clientInfo[0].phoneNumber1}</p>
                <p className=""><span className="font-medium">phoneNumber2</span> {clientInfo[0].phoneNumber2}</p>
                <div className="flex flex-row mt-2 gap-5">
                    <IoMdArrowRoundBack onClick={handleGoBack} className="cursor-pointer h-8 w-8 text-primaryPink"/>
                    <IoBook onClick={() => setShowHistory(!showHistory)} className="cursor-pointer h-8 w-8 text-primaryPink"/>
                </div>
            </div>
        </div>
    </div>
    {showHistory ? <HistoryServices history={asd}/> : null}
    </section> )}
    </>
  );
};

export default ClientInfo;
