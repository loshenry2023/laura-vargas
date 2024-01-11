//hooks,reducer, componentes
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { toast } from 'react-hot-toast'
import branchValidation from '../../functions/createBranchValidations';
import { getBranches } from '../../redux/actions';




//icons
import { IoClose } from 'react-icons/io5';


//funciones


//Variables de entorno
import getParamsEnv from '../../functions/getParamsEnv'


const { API_URL_BASE } = getParamsEnv()

const CreateBranchModal = ({ aux, setAux, setShowCreateBranchModal, token }) => {

    const disptach = useDispatch()


    const [newBranch, setNewBranch] = useState({
        name: "",
        address: "",
        phone: ""
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

        // Use branchValidation to validate the form data
        const validationErrors = branchValidation(newBranch);

        if (Object.keys(validationErrors).length > 0) {
            // If there are validation errors, set them in the state
            setErrors(validationErrors);
            return;
        }

        // If no validation errors, proceed with form submission
        try {
            console.log(newBranch, "enviando al back");

            const data = {
                branchName: newBranch.name,
                address: newBranch.address,
                phoneNumber: newBranch.phone,
                coordinates: "",
                openningHours: "",
                clossingHours: "",
                workingDays: "",
                token: token
            }

            const response = await axios.post(`${API_URL_BASE}/branch`, data);

            if (response.data.created === "ok") {
                setAux(!aux)
                toast.success("Sede creada exitosamente");
               
                setTimeout(() => {
                    closeModal();
                    setNewBranch({
                        name: "",
                        address: "",
                        phone: ""
                    });
                }, 3000);
            } else {
                toast.error("Hubo un problema con la creación");
            }
        } catch (error) {
            toast.error(`Hubo un problema con la creación. ${error.response.data}`);
        }
    };

    useEffect(() => {
        console.log(newBranch)
    },[newBranch])
    


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
                            <div className=" mb-2">
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



                            <div className="flex justify-center items-center pt-4">
                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 w-fit rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                                >
                                    Agregar sede
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateBranchModal