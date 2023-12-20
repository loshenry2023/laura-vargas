import React, { useState } from "react";

import { IoBook } from "react-icons/io5";
import HistoryServices from "./HistoryServices";

const ClientInfo = () => {

    const [showHistory, setShowHistory] = useState(false)

    const clientInfo = {
        id: "dasdasidjasiodas",
        email: "tomas.bombau@gmail.com",
        name: "Tomas",
        lastName: "Bombau",
        id_pers: "35324231",
        phoneNumber1: "1111111111",
        phoneNumber2: "1111111111",
        image: "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702302836/varpjl2p5dwvpwbmdiui.png",
        Calendars: [],
        HistoryServices: [
          {
            id: "oidjaosidjioasjdsad",
            date: "2024-01-10T11:00:00.000Z",
            serviceName: "Depilación del bozo o bigote",
            price: "18500",
            imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
            conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
            branchName: "Restrepo",
            paymentMethodName: "efectivo",
            attededBy: "laura",
          },
          {
            id: "oidjaosidjioasjdsad",
            date: "2024-01-10T11:00:00.000Z",
            serviceName: "Depilación del bozo o bigote",
            price: "18500",
            imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
            conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
            branchName: "Restrepo",
            paymentMethodName: "efectivo",
            attededBy: "laura",
          },
          {
            id: "oidjaosidjioasjdsad",
            date: "2024-01-10T11:00:00.000Z",
            serviceName: "Depilación del bozo o bigote",
            price: "18500",
            imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
            conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
            branchName: "Restrepo",
            paymentMethodName: "efectivo",
            attededBy: "laura",
          },
          {
            id: "oidjaosidjioasjdsad",
            date: "2024-01-10T11:00:00.000Z",
            serviceName: "Depilación del bozo o bigote",
            price: "18500",
            imageServiceDone: "https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg",
            conformity: "https://res.cloudinary.com/doyafxwje/image/upload/v1702994690/PDF/xf8a45ywxyl7tk8t0gj9.pdf",
            branchName: "Restrepo",
            paymentMethodName: "efectivo",
            attededBy: "laura",
          }
        ]
      }

      const handleHistory = () => {
        setShowHistory(!showHistory)
      }

  return (
<section className="flex flex-col w-full items-center">
    <div className="max-w-screen-sm h-fit mt-10 rounded overflow-hidden shadow-lg mx-auto">
        <div className="grid grid-1 place-items-center sm:place-items-start sm:grid-cols-3 sm:m-10">
            <img
                className="border border-double border-black sm:col-span-1 sm:w-full"
                src={clientInfo.image}
                alt="client-photo"
            />
            <div className="m-4 sm:col-span-2 sm:ml-10 sm:mt-0">
                <p className=""> <span className="font-medium">Nombre:</span> {clientInfo.name}</p>
                <p className=""> <span className="font-medium">Apellido:</span> {clientInfo.lastName}</p>
                <p className=""><span className="font-medium">Email:</span> {clientInfo.email}</p>
                <p className=""> <span className="font-medium">ID:</span> {clientInfo.id_pers}</p>
                <p className=""><span className="font-medium">phoneNumber1:</span> {clientInfo.phoneNumber1}</p>
                <p className=""><span className="font-medium">phoneNumber2</span> {clientInfo.phoneNumber2}</p>
                <div className="flex flex-row mt-2 gap-8">
                    <IoBook onClick={handleHistory} className="cursor-pointer h-8 w-8"/>
                </div>
            </div>
        </div>
    </div>
    {showHistory ? <HistoryServices history={clientInfo.HistoryServices}/> : null}
</section>
  );
};

export default ClientInfo;
