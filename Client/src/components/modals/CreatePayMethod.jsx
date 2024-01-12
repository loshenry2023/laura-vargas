//hooks,reducer, componentes
import React, { useEffect, useState } from 'react'

import axios from "axios"
import { toast } from 'react-hot-toast'




//icons
import { IoClose } from 'react-icons/io5';


//funciones


//Variables de entorno
import getParamsEnv from '../../functions/getParamsEnv'


const { API_URL_BASE } = getParamsEnv()

const CreatePayMethodModal = ({ aux, setAux, setShowCreatePayMethodModal, token }) => {


    const [PayMethod, setPayMethod] = useState({
        name: ""
    })

    const [errors, setErrors] = useState({
    });


    const closeModal = () => {

        setShowCreatePayMethodModal(false);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, "probando");
    
        setPayMethod((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    
        if (value.length > 30) {
            setErrors({
                name: "El nombre no puede superar los 30 caracteres"
            });
        } else if (value.length === 0) {
            setErrors({
                name: "El nombre no puede estar vacío"
            });
        } else {
            setErrors({
                name: undefined
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
        if (PayMethod.name.length > 30) {
            setErrors({
                name: "El nombre no puede superar los 30 caracteres"
            });

            return;  
        } else if (PayMethod.name.length === 0) {
            setErrors({
                name: "El nombre no puede estar vacío"
            });
            
            return; 
        } else {
            setErrors({
                name: undefined
            });
        }
    
        try {
            const data = {
    
                paymentMethodName: PayMethod.name,
                token: token
            }
            console.log(data, "enviando al back");
    
            const response = await axios.post(`${API_URL_BASE}/payment`, data);
    
            if (response.data.created === "ok") {
                setAux(!aux)
                toast.success("Método de pago creado exitosamente");
    
                setTimeout(() => {
                    closeModal();
                    setPayMethod({
                        name: "",
                    })
                }, 3000);
            } else {
                toast.error("Hubo un problema con la creación");
            }
        } catch (error) {
            toast.error(`Hubo un problema con la creación. ${error}`);
        }
    };
    
    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27){
              closeModal()
            }
          }
          window.addEventListener('keydown', close)
          return () => window.removeEventListener('keydown', close)}, [PayMethod])


    return (
        <>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
                <div>
                    <div className="w-4/5 mx-auto bg-white shadow rounded-lg p-6 md:w-full dark:bg-darkBackground">
                        <div className='flex justify-between'>
                            <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">Agregar método de pago</h1>
                            <IoClose onClick={closeModal} className=' ml-5 cursor-pointer mt-2 w-5 h-5 hover:scale-125 dark:text-darkText' />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-2">
                                <div>
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Nombre</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="name"  // Make sure this line is present
                                        value={PayMethod.name}
                                        placeholder="Nombre"
                                        className={`border border-black p-2 rounded w-full ${errors.name !== undefined && "border-2 border-red-500"}`}
                                    />
                                    {Object.keys(errors).map((key) => (
                                        errors[key] && <p key={key} className="text-xs text-red-500">{errors[key]}</p>
                                    ))}
                                </div>

                            </div>



                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 w-fit rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                                >
                                    Crear método de pago
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatePayMethodModal