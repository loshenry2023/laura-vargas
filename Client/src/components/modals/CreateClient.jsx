//hooks,reducer, componentes
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useLocation } from 'react-router-dom';
import ToasterConfig from '../Toaster';

//icons
import { IoClose } from 'react-icons/io5';
import { UploadWidget } from '../Uploadwidget';

//funciones
import validateClientInput from '../../functions/registerClient';

//Variables de entorno
import getParamsEnv from '../../functions/getParamsEnv'


const { API_URL_BASE } = getParamsEnv()

const CreateClient = ({setShowClientCreateModal, setActivarNuevoCliente,activarNuevoCliente, setChosenClient, setShowClientListModal}) => {
    const location = useLocation()
    const token = useSelector((state) => state?.token);
    const [client, setClient] = useState({
        email: "",
        name: "",
        lastName: "",
        id_pers: "",
        phoneNumber1: "",
        phoneNumber2: "",
        image: "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702302836/varpjl2p5dwvpwbmdiui.png",
        token: token,
      });
      
      const [errors, setErrors] = useState({
      });

    const closeModal = () => {
        if (location.pathname === "/clientsProfiles") {
            setShowClientCreateModal(false);
        } else {
            setShowClientListModal(false);
        }
    }

    const handleChange = (e) => {
    const { name, value } = e.target;

    setClient((prevInfo) => ({
        ...prevInfo,
        [name]: value,
        }));

    setClient((prevInfo) => {
    const validationErrors = validateClientInput({ ...prevInfo, [name]: value });
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
    }));
    return prevInfo;
    })
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateClientInput(client);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((error) => error !== undefined);

    if (hasErrors) {
    } else {
      try {
        const data = {
          email: client.email,
          name: client.name,
          id_pers: client.id_pers,
          lastName: client.lastName,
          phone1: client.phoneNumber1,
          phone2: client.phoneNumber2,
          image: client.image,
          token: client.token,
        }
        
        const response = await axios.post(`${API_URL_BASE}/newclient`, data)
        
        if (response.data.created === "ok") {
        toast.success("Cliente creado exitosamente")
        setActivarNuevoCliente(!activarNuevoCliente)     
        if (location.pathname !== "/clientsProfiles") {
            setChosenClient({name: data.name, lastName: data.lastName, email: data.email, id: response.data.id})
        }
        setTimeout(() => {
        closeModal();
        setClient(
            {
                email: "",
                name: "",
                lastName: "",
                phone1: "",
                phone2: "",
                image: "",
                id_pers: "",
                token: "",
            }
        )}, 3000);
        } else {
            toast.error("Hubo un problema con la creación")
          }
    } catch (error) {
        toast.error(`Hubo un problema con la creacion. ${error.response.data}`)
      }
    }
}


    return (
        <>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full" style={{ background: "rgba(0, 0, 0, 0.70)"}}>
                <div className="container">
                    <div className="w-full bg-white opacity-100 shadow rounded-lg p-6 md:mx-auto md:w-1/2 2xl:w-1/3 dark:bg-darkBackground">
                        <div className='flex justify-between'>
                            <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">Crear cliente</h1>
                            <IoClose onClick={closeModal} className='cursor-pointer mt-2 w-5 h-5 hover:scale-125 dark:text-darkText' />
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Nombre</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    value={client.name}
                                    placeholder="Nombre"
                                    className={`border border-black p-2 rounded w-full ${errors.name !== undefined && "border-red-500"}`}
                                />  
                                {errors.name !== "" && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Apellido</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={client.lastName}
                                    placeholder="Apellido"
                                    className={`border border-black p-2 rounded w-full ${errors.lastName !== undefined && "border-red-500"}`}
                                />
                                {errors.lastName !== "" && <p className="text-xs text-red-500">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                            <label className="mb-2 text-sm font-bold text-gray-900 dark:text-darkText">Email cliente</label>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={client.email}
                                    placeholder="Email cliente"
                                    className={`border text-gray-500 border-black p-2 rounded w-full ${errors.email !== undefined && "border-red-500"}`}
                                />
                                {errors.email !== "" && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label className='mb-2 text-sm font-bold text-gray-900 dark:text-darkText'>ID de persona</label>
                                <input
                                    placeholder="ID"
                                    className={`border border-black p-2 rounded w-full ${errors.id_pers !== undefined && "border-red-500"}`}
                                    onChange={handleChange}
                                    type="text"
                                    name="id_pers"
                                    value={client.id_pers}
                                />
                                {errors.id_pers !== "" && <p className="text-xs text-red-500">{errors.id_pers}</p>}
                         </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Telefono</label>
                                <input
                                    placeholder="Telefono 1"
                                    className={`border border-black p-2 rounded w-full ${errors.phoneNumber1 !== undefined && "border-red-500"}`}
                                    onChange={handleChange}
                                    type="text"
                                    name="phoneNumber1"
                                    value={client.phoneNumber1}
                                />
                                {errors.phoneNumber1 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber1}</p>}
                            </div>
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Telefono alternativo</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="phoneNumber2"
                                    value={client.phoneNumber2}
                                    placeholder="Telefono 2"
                                    className={`border border-black p-2 rounded w-full ${errors.phoneNumber2 !== undefined && "border-red-500"}`}
                                />
                                {errors.phoneNumber2 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber2}</p>}
                            </div>
                        </div>
                        <div>
                        <div className="mt-2 grid grid-cols-1 place-items-center">
                            <UploadWidget setUserData={setClient} />
                            <div className='mt-2 mb-2'>
                                <img className='w-20 h-20 rounded' src={client.image} alt="user-avatar" />
                            </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 w-full rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                        >
                            Registrar cliente
                        </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToasterConfig />
        </>
    );
}

export default CreateClient