import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import validateRegisterInput from '../../functions/registerFormValidations'
import axios from 'axios';
import { UploadWidget } from '../Uploadwidget';

function RegisterForm({ setShowResgisterFormModal, branches, specialties }) {

  console.log(branches)
  const roles = ["superAdmin", "admin", "user"];
 


  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    userName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    image: "imagen.jpg",
    specialtyName: [],
    commission: "",
    branch: [],
    rol: "",
    notificationEmail: "notificationEmail@gmail.com"
  });

  const [errors, setErrors] = useState({
  });

  const closeModal = () => {
    setShowResgisterFormModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox' && name === 'specialtyName') {
      setUserData((prevInfo) => {
        const updatedSpecialities = checked
          ? [...prevInfo.specialtyName, value]
          : prevInfo.specialtyName.filter((specialty) => specialty !== value);
  
        return {
          ...prevInfo,
          [name]: updatedSpecialities,
        };
      });
    } else {
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
    console.log(validationErrors)
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => error !== undefined);

    if (hasErrors) {
      console.log("Formulario inválido. Corrige los errores antes de enviar.");
    } else {
      console.log("Enviando al backend:", userData);
      try {
        const data = {
          name: userData.name,
          lastName: userData.lastName,
          userName: userData.userName,
          specialty: userData.specialtyName,
          branch: userData.branch,
          phone1: userData.phoneNumber1,
          phone2: userData.phoneNumber2,
          role: userData.rol,
          notificationEmail: userData.notificationEmail,
          image: userData.image,
          comission: userData.commission
        }
        const response = await axios.post("http://localhost:3001/laura-vargas/newuser", data)
        console.log(response)
        
        if (response.data.created === "ok") {
          closeModal()
          setUserData(
            {
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
            }
          )

          window.alert("usuario creado exitosamente")

        } else {
          window.alert("Hubo un problema con la creacion")
        }
       
      } catch (error) {
        console.log(error)
      }

    }
  };

  useEffect(() => {
    console.log(errors, "errors");
    console.log(userData, "userData");
  }, [errors, userData]);


    return (
      <>
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-95'>
          <form
            className="z-10 opacity-100 bg-white bg-opacity-90 rounded-lg shadow md:mt-0 sm:max-w-md xl:px-6 py-2 space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
          >
            <span
              onClick={closeModal}
              className='ml-[600px] cursor-pointer text-gray-600 hover:text-gray-800'
            >
              <IoClose size={20} />
            </span>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Registra nuevo usuario
            </h1>

            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mr-4">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="userName"
                    value={userData.userName}
                    className={`bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.userName !== undefined && "border-red-500"}`}
                    placeholder="lvargas@cejasypestañas.com"
                    
                  />
                  {errors.userName !== "" && <p className="text-xs text-red-500">{errors.userName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    className={`bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.lastName !== undefined && "border-red-500"}`}
                    placeholder="lvargas@cejasypestañas.com"
                    
                  />
                  {errors.lastName !== "" && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Telefono 1</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phoneNumber1"
                    value={userData.phoneNumber1}
                    className={`bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.phoneNumber1 !== undefined && "border-red-500"}`}
                    placeholder="lvargas@cejasypestañas.com"
                    
                  />
                  {errors.phoneNumber1 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber1}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Especialidades</label>
                  {specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={specialty}
                        name="specialtyName"
                        value={specialty.id}
                        checked={userData.specialtyName.includes(specialty.id)}
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
                  <label className="block mt-3 mb-2 text-sm font-medium text-gray-900">Rol</label>
                  <select
                    onChange={handleChange}
                    name="rol"
                    value={userData.rol}
                    className={`bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.rol !== undefined && "border-red-500"}`}
                    
                  >
                    <option value="" disabled hidden>Selecciona un rol</option>
                    {roles.map((rol, index) => (
                      <option key={index} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </select>
                  {errors.rol !== "" && <p className="text-xs text-red-500">{errors.rol}</p>}
                </div>
              </div>

              <div className='flex flex-col gap-5'>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={userData.name}
                    className={`bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.name !== undefined && "border-red-500"}`}
                    placeholder="Nombre"
                    
                  />
                  {errors.name !== "" && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Comisión</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="commission"
                    value={userData.commission}
                    placeholder="%"
                    className={`bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.commission !== undefined && "border-red-500"}`}
                    
                  />
                  {errors.commission !== "" && <p className="text-xs text-red-500 ">{errors.commission}</p>}
                </div>
                <div >
                  <label className="block mb-2 text-sm font-medium text-gray-900">Telefono 2</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phoneNumber2"
                    value={userData.phoneNumber2}
                    className={`bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.phoneNumber2 !== undefined && "border-red-500"}`}
                    placeholder="lvargas@cejasypestañas.com"
                    
                  />
                  {errors.phoneNumber2 !== "" && <p className="text-xs text-red-500">{errors.phoneNumber2}</p>}
                </div>
                <div className="">
                  <label className="block mt-3 mb-2 text-sm font-medium text-gray-900">Sedes</label>
                  {branches.map((branch, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={branch}
                        name="branch"
                        value={branch.id}
                        checked={userData.branch.includes(branch.id)}
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
                <UploadWidget setUserData={setUserData}/>
                <img className='w-[100px] h-[100px] m-auto' src={userData.image}></img>
              </div>
              
            </div>
            <button
              className="w-full bg-secondaryPink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-black px-5 py-2.5 text-center"
            >
              Registrar
            </button>
          </form>
        </div>
      </>
    );
  }

  export default RegisterForm;