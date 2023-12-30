import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getClientId } from '../redux/actions/';
import HistoryServices from './HistoryServices';
import { toast } from 'react-hot-toast'
import ToasterConfig from '../components/Toaster'

import { UploadWidgetDate } from './UploadWidgetDate';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Loader from './Loader';
import { UploadWidgetConsent } from './UploadWidgetConsent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dateDetail.css'
import getParamsEnv from '../functions/getParamsEnv';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";



const { API_URL_BASE, AGENDA } = getParamsEnv()

const DateDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id: appointmentId } = useParams();
    const branch = useSelector((state) => state?.workingBranch)
    const token = useSelector((state) => state?.token);
    const calendar = useSelector((state) => state?.calendar);
    const clientInfo = useSelector((state) => state?.clientID);
    const payMethods = useSelector((state) => state?.payMethods)
    const [clientId, setClientId] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState({
        paymentMethod1: '',
        paymentMethod2: '',
    });
    const [paymentLoaded, setPaymentLoaded] = useState({
        price: false,
        method: false
    })

    const [showFinishConfirmation, setShowFinishConfirmation] = useState(false)

    const [showPayment2, setShowPayment2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [photoLoaded, setPhotoLoaded] = useState(false);
    const [consentLoaded, setConsentLoaded] = useState(false);
    const [photo, setPhoto] = useState("https://www.pngfind.com/pngs/m/572-5720766_eye-logos-png-image-with-transparent-background-eyelid.png")
    const [consent, setConsent] = useState("https://img.freepik.com/vector-premium/icono-documento-fondo-transparente_929446-70.jpg?size=626&ext=jpg")
    const [consentURL, setConsentUrl] = useState("")
    const [price, setPrice] = useState({
        amount1: "",
        amount2: ""
    })
    const [aux, setAux] = useState(false)

    useEffect(() => {
      
        if (calendar) {
            const findAppointment = calendar.find((date) => date.id === appointmentId);
            if (findAppointment) {
                setAppointment(findAppointment);
                setIsLoading(true);
                dispatch(getClientId(findAppointment.Client.id, { token }))
            }
        }

    }, [dispatch, token, appointmentId, clientId]);

    const handlePriceChange = (e, priceType) => {
        const updatedPrice = { ...price, [priceType]: e.target.value };
        setPrice(updatedPrice);
        setPaymentLoaded((prevInfo) => ({
            ...prevInfo,
            price: true
        }));
    };

    const handlePaymentMethodChange = (e, methodNumber) => {
        setPaymentMethods({
            ...paymentMethods,
            [`paymentMethod${methodNumber}`]: e.target.value,
        });
        setPaymentLoaded((prevInfo) => ({
            ...prevInfo,
            method: true
        }));
    };

    const finishConfirmed = (confirmed) => {
        if (confirmed) {
            hideDeleteModal();
            handleSubmit()
        } else {
            hideDeleteModal();
        }
    };

    const hideDeleteModal = () => {
        setShowFinishConfirmation(false)
    }

    const updateDateState = async () => {


        const data = {
            date_from: appointment.date_from,
            date_to: appointment.date_to,
            obs: appointment.obs,
            idBranch: appointment.Branch.id,
            idUser: appointment.User.id,
            idService: appointment.Service.id,
            idClient: appointment.Client.id,
            current: false,
            token: token
        };


        try {
            const response = await axios.put(`${API_URL_BASE}/calendar/${appointmentId}`, data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    }, [appointment])


    const handleConsentLoad = () => {
        setConsentLoaded(true);
    };

    const observationSectionStyle = {
        backgroundColor: photoLoaded ? '#A8D0B9' : '#BC544B',
    };

    const observationSectionStyleConsent = {
        backgroundColor: consentLoaded ? '#A8D0B9' : '#BC544B',
    };

    const isButtonDisabled = !(photoLoaded && consentLoaded && price && paymentLoaded.price && paymentLoaded.method);

    const handleSubmit = async () => {

        try {

            const dateData =
            {
                idUser: appointment.User.id,
                idclient: appointment.Client.id,
                imageServiceDone: photo,
                date: appointment.date_from,
                conformity: consentURL,
                branchName: appointment.Branch.branchName,
                paymentMethodName1: paymentMethods.paymentMethod1,
                amount1: price.amount1,
                paymentMethodName2: paymentMethods.paymentMethod2 || " ",
                amount2: price.amount2 || "0",
                serviceName: appointment.Service.serviceName,
                attendedBy: `${appointment.User.name} ${appointment.User.lastName}`,
                email: appointment.Client.email,
                name: appointment.Client.name,
                lastName: appointment.Client.lastName,
                id_pers: appointment.Client.id_pers,
                token: token
            }

            const response = await axios.post(`${API_URL_BASE}/newhistoricproc`, dateData)
            if (response.data.created === "ok") {
                toast.success("Cita Finalizada exitosamente")
                updateDateState()
                setTimeout(() => {
                    navigate(AGENDA)
                }, 3000);

            }

        } catch (error) {
            console.log(error)
        }




    }

    const handleGoBack = () => {
        navigate(-1)
    }



    if (!isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-auto p-8">
                {/* Client Details */}

                <div className="p-6 bg-primaryPink backdrop-blur-xl bg-opacity-60 rounded-md">
                    <FaRegArrowAltCircleLeft onClick={handleGoBack} size={30} className='mb-[-30px] text-[#d66a6a] hover:text-black' />
                    <div className="relative border-4 border-double border-primaryPink max-w-screen-sm mt-10 rounded overflow-hidden shadow-lg mx-auto">


                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:p-5">
                            <img
                                src={clientInfo.image}
                                className="w-40 shadow shadow-black rounded-full col-span-1 sm:w-full"
                                alt="client-photo"
                            />
                            <div className="m-4 col-span-2 ml-10 mt-0 space-y-2">
                                <p className="font-medium">
                                    Nombre: <span className='font-light'>{clientInfo.name}</span>
                                </p>
                                <p className="font-medium">
                                    Apellido: <span className='font-light'>{clientInfo.lastName}</span>
                                </p>
                                <p className="font-medium">
                                    Email: <span className='font-light'>{clientInfo.email}</span>
                                </p>
                                <p className=""> <span className="font-medium">ID:</span> {clientInfo.id_pers}</p>
                                <p className="font-medium">
                                    phoneNumber1: <span className='font-light'>{clientInfo.phoneNumber1}</span>{' '}
                                </p>
                                <p className="font-medium">
                                    phoneNumber2: <span className='font-light'>{clientInfo.phoneNumber2}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Observations Section */}
                <div className="p-6 bg-primaryPink backdrop-blur-xl bg-opacity-60 rounded-md">
                    <div className="relative border-4 border-double border-primaryPink max-w-screen-sm mt-10 rounded overflow-hidden shadow-lg mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                            <div className='p-4 rounded-md' style={observationSectionStyle}>
                                <p className="mb-4">Agrega Foto de este procedimiento</p>
                                <UploadWidgetDate setPhoto={setPhoto} setPhotoLoaded={setPhotoLoaded} />
                                <img className='w-12 h-12 mt-5' src={photo} alt='foto de procedimiento' />
                            </div>
                            <div className='p-4 rounded-md' style={observationSectionStyleConsent}>
                                <p className="mb-4">Agrega formulario de conformidad</p>
                                <UploadWidgetConsent setConsentUrl={setConsentUrl} setConsent={setConsent} setConsentLoaded={setConsentLoaded} />
                                <img className='w-12 h-12 mt-5' src={consent} alt='foto de procedimiento' />
                            </div>
                        </div>
                    </div>
                </div>


                {/* History Services Section */}
                {isLoading && (
                    <div className="p-6 bg-primaryPink backdrop-blur-xl bg-opacity-60 rounded-md">
                        {clientInfo.HistoryServices ? (
                            <div className='overflow-auto max-h-[400px] scrollbar-container'>
                                <HistoryServices history={clientInfo.HistoryServices} />
                            </div>
                        ) : (
                            <p>Loading history...</p>
                        )}
                    </div>
                )}

                {/* Payment Section */}
                <div className="p-6 bg-primaryPink backdrop-blur-xl bg-opacity-60 rounded-md border-2 border-primaryPink flex flex-col gap-4">
                    <div className="p-4 relative border-4 border-double border-primaryPink max-w-screen-sm mt-10 rounded overflow-hidden shadow-lg mx-auto">



                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-row'>

                                <div className="max-w-screen-sm rounded overflow-hidden shadow-lg p-6 flex flex-row gap-8 justify-center align-center">

                                    <div className="max-w-screen-sm rounded overflow-hidden shadow-lg p-6">
                                        <p className="block text-sm font-medium text-gray-700">Procedimiento</p>
                                        <p>{appointment.Service.serviceName}</p>
                                    </div>
                                    <div className="max-w-[200px] rounded overflow-auto scrollbar-container shadow-lg p-6">
                                        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                                        <p>{appointment.obs}</p>
                                    </div>
                                    <div className="max-w-screen-sm rounded overflow-hidden shadow-lg p-6">
                                        <p className="block text-sm font-medium text-gray-700">Precio final</p>
                                        <p className='m-auto'>{appointment.Service.price}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-10">
                                <div className="max-w-screen-sm rounded overflow-hidden shadow-lg p-6 flex flex-col gap-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Precio $</label>
                                        <input
                                            type="number"
                                            value={price.amount1}
                                            onChange={(e) => handlePriceChange(e, 'amount1')}
                                            className="input"
                                            placeholder="Ingrese el precio"
                                        />
                                    </div>


                                    <div>
                                    <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Medio de Pago A</label>
                                                <select
                                                    value={paymentMethods.paymentMethod1}
                                                    onChange={(e) => handlePaymentMethodChange(e, 1)}
                                                    className="input"
                                                >
                                                    <option value="" disabled>
                                                        Elija medio de pago
                                                    </option>
                                                    {payMethods.map((method) => (
                                                        <option key={method.id} value={method.paymentMethodName}>
                                                            {method.paymentMethodName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <button onClick={() => setShowPayment2(!showPayment2)}>
                                    {showPayment2 ? <CiCircleMinus size={30} /> : <CiCirclePlus size={30} />}
                                </button>
                                {showPayment2 && (
                                    <div className="max-w-screen-sm rounded overflow-hidden shadow-lg p-6 flex flex-col gap-4">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Precio $</label>
                                            <input
                                                type="number"
                                                value={price.amount2}
                                                onChange={(e) => handlePriceChange(e, 'amount2')}
                                                className="input"
                                                placeholder="Ingrese el precio"
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Medio de Pago B</label>
                                                <select
                                                    value={paymentMethods.paymentMethod2}
                                                    onChange={(e) => handlePaymentMethodChange(e, 2)}
                                                    className="input"
                                                >
                                                    <option value="" disabled>
                                                        Elija medio de pago
                                                    </option>
                                                    {payMethods.map((method) => (
                                                        <option key={method.id} value={method.paymentMethodName}>
                                                            {method.paymentMethodName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={isButtonDisabled}
                                onClick={() => setShowFinishConfirmation(true)}
                                className={`btn bg-primaryPink p-2 rounded-full cursor-pointer shadow shadow-black ${isButtonDisabled ? 'disabled-btn' : ''}`}
                                style={{ backgroundColor: isButtonDisabled ? 'gray' : '#e59494' }} // Set your desired colors
                            >
                                Finalizar Cita
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToasterConfig />
            {showFinishConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`bg-white p-6 rounded-lg shadow-lg text-center sm:flex sm:flex-col ${window.innerWidth < 340 ? "max-w-sm" : "max-w-md"
                            }`}
                    >
                        <p className="mb-4 text-sm sm:text-base">
                            ¿Estás seguro de que deseas Finalizar esta cita?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => finishConfirmed(true)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm sm:text-base"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={() => finishConfirmed(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DateDetail;
