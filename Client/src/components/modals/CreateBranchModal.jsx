//hooks,reducer, componentes
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import branchValidation from '../../functions/createBranchValidations';
import { IoClose } from 'react-icons/io5';
import getParamsEnv from '../../functions/getParamsEnv'
import Loader from '../Loader'



const { API_URL_BASE } = getParamsEnv()

const CreateBranchModal = ({ aux, setAux, setShowCreateBranchModal, token }) => {


    const [submitLoader, setSubmitLoader] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)

    const [newBranch, setNewBranch] = useState({
        name: "",
        address: "",
        phone: "",
        coordinates: ""
    })

    const [errors, setErrors] = useState({
    });


    const closeModal = () => {

        setShowCreateBranchModal(false);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;



        setNewBranch((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));


        setNewBranch((prevInfo) => {
            const validationErrors = branchValidation({ ...prevInfo, [name]: value });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validationErrors[name],
            }));
            return prevInfo;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        const validationErrors = branchValidation(newBranch);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);
            return;
        }


        try {
            
            setDisableSubmit(true)
            setSubmitLoader(true)

            const data = {
                branchName: newBranch.name,
                address: newBranch.address,
                phoneNumber: newBranch.phone,
                coordinates: newBranch.coordinates || "",
                openningHours: "",
                clossingHours: "",
                workingDays: "",
                token: token
            }

            const response = await axios.post(`${API_URL_BASE}/branch`, data);

            if (response.data.created === "ok") {
                setSubmitLoader(false)
                setAux(!aux)
                toast.success("Sede creada exitosamente");

                setTimeout(() => {
                    closeModal();
                    setDisableSubmit(false)
                    setNewBranch({
                        name: "",
                        address: "",
                        phone: "",
                        branch: ""
                    });
                }, 3000);
            } else {
                setDisableSubmit(false)
                setSubmitLoader(false)
                toast.error("Hubo un problema con la creación");
            }
        } catch (error) {
            toast.error(`Hubo un problema con la creación. ${error.response.data}`);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [newBranch])




    return (
        <>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
                <div>
                    <div className="w-4/5 mx-auto bg-white shadow rounded-lg p-6 md:w-full dark:bg-darkBackground">
                        <div className='flex justify-between'>
                            <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">Agregar Sede</h1>
                            <IoClose onClick={closeModal} className=' ml-5 cursor-pointer mt-2 w-5 h-5 hover:scale-125 dark:text-darkText' />
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Nombre de la Sede</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    value={newBranch.name}
                                    placeholder="Nombre"
                                    className={`border border-black p-2 rounded w-full ${errors.name !== undefined && "border-2 border-red-500"}`}
                                />
                                {errors.name !== "" && <p className="text-xs text-red-500 p-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Dirección</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="address"
                                    value={newBranch.address}
                                    placeholder="Dirección"
                                    className={`border border-black p-2 rounded w-full ${errors.address !== undefined && "border-2 border-red-500"}`}
                                />
                                {errors.address !== "" && <p className="text-xs text-red-500 p-1">{errors.address}</p>}
                            </div>


                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Teléfono</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="phone"
                                    value={newBranch.phone}
                                    placeholder="Phone"
                                    className={`border border-black p-2 rounded w-full ${errors.phone !== undefined && "border-2 border-red-500"}`}
                                />
                                {errors.phone !== "" && <p className="text-xs text-red-500 p-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Coordenadas Google Maps</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="coordinates"
                                    value={newBranch.coordinates}
                                    placeholder="Ingresa sus link de coordenadas"
                                    className={`border border-black p-2 rounded w-full ${errors.coordinates !== undefined && "border-2 border-red-500"}`}
                                />
                                {errors.coordinates !== "" && <p className="text-xs text-red-500 p-1">{errors.coordinates}</p>}
                            </div>



                            <div className="flex justify-center items-center pt-4">
                                
                                {!submitLoader ?
                                    <button
                                    type="submit"
                                    disabled={disableSubmit}
                                    className="mt-2 px-4 py-2 w-fit rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                                >
                                    Agregar sede
                                </button> :
                <Loader />
              }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateBranchModal