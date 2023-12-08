import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";



function RegisterForm({ setShowResgisterFormModal }) {


  const specialitys = ["Cejas", "Pestañas", "Micropigmentación", "Lifting", "Administración"];
  const roles = ["superAdmin", "admin", "specialist"]
  const sedes = ["Villavicencio", "Restrepo"]

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    speciality: "",
    commission: null,
    branch: "",
    rol: "",
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(userData)
  }, [userData])




  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(userData, "Esto va para el back")
   
  }

  const closeModal = () => {
    setShowResgisterFormModal(false)
  }

  return (


    <>
      <div className=' absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-95'>
      <form className="z-10 opacity-100 bg-white bg-opacity-90 rounded-lg shadow md:mt-0 sm:max-w-md xl:px-6 py-2 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                name="email"
                value={userData.email}
                className="bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="lvargas@cejasypestañas.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Contraseña
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={userData.password}
                placeholder="••••••••"
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Especialidad</label>
              <select
                onChange={handleChange}
                name="speciality"
                value={userData.speciality}
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled hidden>
                  Elige especialidad
                </option>
                {specialitys.map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mt-3 mb-2 text-sm font-medium text-gray-900">Sede</label>
              <select
                onChange={handleChange}
                name="branch"
                value={userData.branch}
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled hidden>Selecciona una Sede</option>
                {sedes.map((sede, index) => (
                  <option key={index} value={sede}>
                    {sede}
                  </option>))}

              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Nombre Completo</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={userData.name}
                className="bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nombre y apellido"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirma contraseña
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                placeholder="••••••••"
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">Comision</label>
              <input
                onChange={handleChange}
                type="text"
                name="commission"
                value={userData.commission}
                placeholder="%"
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mt-3 mb-2 text-sm font-medium text-gray-900">Rol</label>
              <select
                onChange={handleChange}
                name="rol"
                value={userData.rol}
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled hidden>Selecciona un rol</option>
                {roles.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-secondaryPink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-black px-5 py-2.5 text-center"
        >
          Regsitrar
        </button>
      </form>
      </div>
     
    </>

  )
}
export default RegisterForm