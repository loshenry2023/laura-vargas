import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import validateRegisterInput from '../../functions/registerFormValidations';
import axios from 'axios';
import { UploadWidget } from '../Uploadwidget';


import getParamsEnv from "./../../functions/getParamsEnv"
const { USERPROFILES } = getParamsEnv();

function EditModal({ setShowEditModal, branches, specialties, userId }) {
    const navigate = useNavigate();

    const roles = ["superAdmin", "admin", "user"];

    const [userData, setUserData] = useState({
        name: userId.name,
        lastName: userId.lastName,
        userName: userId.userName,
        phoneNumber1: userId.phone1,
        phoneNumber2: userId.phone2 || "",
        image: userId.image,
        specialtyName: userId.specialties,
        commission: userId.comission,
        branch: userId.branch,
        rol: userId.role,
        notificationEmail: "notificationEmail@gmail.com"
    });

    const [errors, setErrors] = useState({});

    const closeModal = () => {
        setShowEditModal(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'branch') {
            setUserData((prevInfo) => {
                const updatedBranch = checked ? { id: value, branchName: value } : null;

                return {
                    ...prevInfo,
                    [name]: updatedBranch,
                };
            });
        } else if (type === 'checkbox' && name === 'specialtyName') {
           
            setUserData((prevInfo) => {
                const updatedSpecialities = checked
                    ? [...prevInfo.specialtyName, { id: value, specialtyName: value }]
                    : prevInfo.specialtyName.filter((specialty) => specialty.id !== value);

                return {
                    ...prevInfo,
                    [name]: updatedSpecialities,
                };
            });
        } else if(name === 'rol'){
            if(userId.userName === 'loshenry2023@gmail.com'){
                alert('Usted es el primer superAdmin. No puede cambiar su rol.')
            } else{
                setUserData((prevInfo) => ({
                    ...prevInfo,
                    [name]: value,
                }));
            }
        }
        else {
            setUserData((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }

        const validationErrors = validateRegisterInput({ ...userData, [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateRegisterInput(userData);
        setErrors(validationErrors);

        const hasErrors = Object.values(validationErrors).some((error) => error !== undefined);

        if (hasErrors) {
            console.log("Formulario inválido. Corrige los errores antes de enviar.");
        } else {
            try {
                const specialtiesId = userData.specialtyName.map((specialty) => specialty.id);

                const data = {
                    name: userData.name,
                    lastName: userData.lastName,
                    specialty: specialtiesId,
                    branch: userData.branch.id,
                    phone1: userData.phoneNumber1,
                    phone2: userData.phoneNumber2 || "",
                    role: userData.rol,
                    notificationEmail: userData.notificationEmail,
                    image: userData.image,
                    comission: userData.commission
                };

                const response = await axios.put(`http://localhost:3001/laura-vargas/userdata/${userId.id}`, data);

                if (response.data.updated === "ok") {
                    closeModal();
                    setUserData({
                        name: "",
                        lastName: "",
                        userName: "",
                        phoneNumber1: "",
                        phoneNumber2: "",
                        image: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-2271804793.jpg",
                        specialtyName: [],
                        commission: "",
                        branch: [],
                        rol: "",
                        notificationEmail: "notificationEmail@gmail.com"
                    });
                    window.alert("Usuario modificado correctamente");
                    navigate(USERPROFILES);
                } else {
                    window.alert("Hubo un problema con la creación");
                }
            } catch (error) {
                window.alert(`Hubo un problema con la modificacion. ${error.response.data}`)
            }
        }
    };

    useEffect(() => {
        console.log(errors, "errors");
        console.log(userData, "userData");
    }, [errors, userData]);

    return (
        <>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-95">
                <div className="container">
                    <div className="w-full bg-white shadow rounded-lg p-6 md:mx-auto md:w-1/2 2xl:w-1/3">
                        <IoClose onClick={closeModal} className='flex cursor-pointer' />
                        <h1 className="text-xl font-semibold mb-4 text-black">Editar usuario</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="first-letter:grid grid-cols-1 mb-2">
                                <input
                                    placeholder="Gmail Usuario"
                                    className={`cursor-not-allowed border bg-gray-200 text-gray-500 border-black p-2 rounded w-full ${errors.userName !== undefined && "border-red-500"}`}
                                    onChange={handleChange}
                                    type="email"
                                    name="userName"
                                    value={userData.userName}
                                    disabled
                                />
                                {errors.userName !== "" && <p className="text-xs text-red-500">{errors.userName}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        placeholder="Nombre"
                                        className={`border border-black p-2 rounded w-full ${errors.name !== undefined && "border-red-500"}`}
                                    />
                                    {errors.name !== "" && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Apellido"
                                        className={`border border-black p-2 rounded w-full ${errors.lastName !== undefined && "border-red-500"}`}
                                        onChange={handleChange}
                                        name="lastName"
                                        value={userData.lastName}
                                    />
                                    {errors.lastName !== "" && <p className="text-xs text-red-500">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="first-letter:grid grid-cols-1 gap-4 mb-2">
                                <input
                                    placeholder="Email para notifiaciones"
                                    className="border border-black p-2 rounded w-full"
                                    onChange={handleChange}
                                    type="email"
                                    name="notificationEmail"
                                    value={userData.notificationEmail}
                                />
                                {errors.notificationEmail !== "" && <p className="text-xs text-red-500">{errors.notificationEmail}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div>
                                    <input
                                        placeholder="Telefono 1"
                                        className={`border border-black p-2 rounded w-full ${errors.phoneNumber1 !== undefined && "border-red-500"}`}
                                        onChange={handleChange}
                                        type="text"
                                        name="phoneNumber1"
                                        value={userData.phoneNumber1}
                                    />
                                    {errors.phoneNumber1 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber1}</p>}
                                </div>
                                <div>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="phoneNumber2"
                                        value={userData.phoneNumber2}
                                        placeholder="Telefono 2"
                                        className={`border border-black p-2 rounded w-full ${errors.phoneNumber2 !== undefined && "border-red-500"}`}
                                    />
                                    {errors.phoneNumber2 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber2}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="commission"
                                        value={userData.commission}
                                        placeholder="Comision"
                                        className={`border border-black p-2 rounded w-full ${errors.commission !== undefined && "border-red-500"}`}
                                    />
                                    {errors.commission !== "" && <p className="text-xs text-red-500 ">{errors.commission}</p>}
                                </div>
                                <div>
                                    <select
                                        onChange={handleChange}
                                        name="rol"
                                        value={userData.rol}
                                        placeholder='Seleccione un rol'
                                        className={`bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.rol !== undefined && "border-red-500"}`}
                                    >
                                        {roles.map((rol, index) => (
                                            <option key={index} value={rol}>
                                                {rol}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.rol !== "" && <p className="text-xs text-red-500">{errors.rol}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Especialidades</label>
                                    {specialties.map((specialty, index) => (
                                        <div key={index} className="flex items-center"> 
                                            <input
                                                type="checkbox"
                                                id={specialty.id}
                                                name="specialtyName"
                                                value={specialty.id}
                                                checked={userData.specialtyName.map(s => s.id).includes(specialty.id)}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={specialty} className="text-sm text-gray-900">
                                                {specialty.specialtyName}
                                            </label>
                                        </div>
                                    ))}
                                    {errors.specialtyName !== "" && <p className="text-xs text-red-500">{errors.specialtyName}</p>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Sedes</label>
                                    {branches.map((branch, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={branch}
                                                name="branch"
                                                value={branch.id}
                                                checked={userData.branch && userData.branch.id === branch.id}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={branch} className="text-xs text-gray-900">
                                                {branch.branchName}
                                            </label>
                                        </div>
                                    ))}
                                    {errors.branch !== "" && <span className="text-xs text-red-500">{errors.branch}</span>}
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col w-full items-center">
                                        <UploadWidget className="w-full" setUserData={setUserData} />
                                    <div className='mt-2 mb-2'>
                                        <img className='w-20 h-20 rounded' src={userData.image} alt="user-avatar" />
                                    </div>
                                </div>  
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 w-full rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors"
                            >
                                Actualizar usuario
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditModal;
