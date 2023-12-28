import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import getParamsEnv from '../../functions/getParamsEnv';
import validateEditAppointment from '../../functions/editAppointmentValidations';

const { API_URL_BASE } = getParamsEnv();

const EditAppointment = ({ setShowEditAppointment, token, date, services, users, setRefrescarCita, refrescarCita, chosenClient }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [formChanged, setFormChanged] = useState(false);

  const userSpecialist = useSelector((state) => state?.user);
  const allBranches = useSelector((state) => state?.branches);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const startTime = new Date(date.date_from);
  const startHour = startTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  const endTime = new Date(date.date_to);
  const endHour = endTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const onlyDate = date.date_from;
  const dateObject = new Date(onlyDate);
  const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
  const [dateTime, setDateTime] = useState(formattedDate);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  const [AppointmentInfo, setAppointmentInfo] = useState({
    clientName: date.Client.name || "",
    clientLastName: date.Client.lastName || "",
    branch: {
      id: date.Branch.id || "",
      name: date.Branch.branchName || "",
    },
    service: {
      id: date.Service.id || "",
      name: date.Service.serviceName || ""
    },
    date: dateTime || "",
    specialist: {
      id: date.User.id || "",
      name: `${date.User.name} ${date.User.lastName}` || ""
    },
    date_from: startHour || "",
    date_to: endHour || "",
    obs: date.obs || ""
  });

  const closeModal = () => {
    setShowEditAppointment(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "date_from" || name === "date_to") {
      const data = {
        date_from: name === "date_from" ? value : AppointmentInfo.date_from,
        date_to: name === "date_to" ? value : AppointmentInfo.date_to,
      };

      error = validateEditAppointment(data)[name];
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormChanged(true);

    if (name === 'branch') {
      const parsedValue = JSON.parse(value);

      setAppointmentInfo((prevInfo) => ({
        ...prevInfo,
        branch: {
          id: parsedValue.id,
          name: parsedValue.branchName,
        }
      }));
    } else if (name === 'specialist') {
      const parsedValue = JSON.parse(value);

      setAppointmentInfo((prevInfo) => ({
        ...prevInfo,
        specialist: {
          id: parsedValue.id,
          name: `${parsedValue.name} ${parsedValue.lastName}`,
        }
      }));
    } else if (name === 'service') {
      const parsedValue = JSON.parse(value);

      setAppointmentInfo((prevInfo) => ({
        ...prevInfo,
        service: {
          id: parsedValue.id,
          name: parsedValue.serviceName,
        }
      }));
    } else if (name === 'date') {
      const dateObject = new Date(value);
      const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
      setDateTime(formattedDate);
    } else {
      setAppointmentInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const formatDateTime = (date, time) => {
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    const formattedDateTime = `${formattedDate} ${time}`;
    return formattedDateTime;
  };

  const filteredBranch = allBranches.find(branch => branch.branchName === AppointmentInfo.branch.name);
  const address = filteredBranch.address;
  const phoneNumber = filteredBranch.phoneNumber;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedDateFrom = formatDateTime(AppointmentInfo.date, AppointmentInfo.date_from);
    const formattedDateTo = formatDateTime(AppointmentInfo.date, AppointmentInfo.date_to);
  
    const data = {
      date_from: formattedDateFrom,
      date_to: formattedDateTo,
      obs: AppointmentInfo.obs,
      idBranch: AppointmentInfo.branch.id,
      idUser: AppointmentInfo.specialist.id,
      idService: AppointmentInfo.service.id,
      idClient: date.Client.id,
      current: true,
      token: token
    };

    const validateData = {
      date_from: AppointmentInfo.date_from,
      date_to: AppointmentInfo.date_to,
      obs: AppointmentInfo.obs,
      idBranch: AppointmentInfo.branch.id,
      idUser: AppointmentInfo.specialist.id,
      idService: AppointmentInfo.service.id,
      idClient: date.Client.id,
      current: true,
      token: token
    };
  
    // Utiliza la función de validación externa
    const validationErrors = validateEditAppointment(validateData);
  
    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores de validación, actualiza el estado y muestra mensajes de error
      setValidationErrors(validationErrors);
      toast.error("Por favor, corrige los errores en el formulario antes de enviarlo.");
      return;
    }
  
    try {
      const response = await axios.put(`${API_URL_BASE}/calendar/${date.id}`, data);
  
      const sendEmail = {
        origin: userSpecialist.userName,
        target: date.Client.email,
        subject: "Laura Vargas - Modificación de Cita",
        html: `<!-- Tu contenido HTML para el correo -->`,
        token: token
      };
  
      if (response.data.updated === "ok") {
        toast.success("Cita actualizada exitosamente");
        setTimeout(() => {
          closeModal();
        }, 3000);
  
        await axios.post(`${API_URL_BASE}/sendmail`, sendEmail);
        setRefrescarCita(!refrescarCita);
      } else {
        toast.error("Hubo un problema al modificar la cita");
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'An error occurred';
      console.error(error);
      toast.error(`Hubo un problema al modificar la cita. ${errorMessage}`);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
        <div className="container">
          <div className="w-full bg-white shadow rounded-lg p-6 md:mx-auto md:w-1/2 2xl:w-1/3 dark:bg-darkBackground">
            <div className='flex justify-between'>
              <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">Editar Cita</h1>
              <IoClose onClick={closeModal} className='cursor-pointer hover:scale-125 mt-2 w-5 h-5 dark:text-darkText' />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Cliente</label>
                  <input
                    type="text"
                    name="clientName"
                    value={AppointmentInfo.clientName}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                  />
                </div>
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>&nbsp;</label>
                  <input
                    type="text"
                    name="clientLastName"
                    value={AppointmentInfo.clientLastName}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Sucursal</label>
                <select
                  name="branch"
                  value={JSON.stringify(AppointmentInfo.branch)}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {allBranches.map((branch, index) => (
                    <option key={index} value={JSON.stringify(branch)}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Servicio</label>
                  <select
                    name="service"
                    value={JSON.stringify(AppointmentInfo.service)}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {services.map((service, index) => (
                      <option key={index} value={JSON.stringify(service)}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Fecha</label>
                  <input
                    type="date"
                    name="date"
                    value={dateTime}
                    onChange={handleChange}
                    min={formattedCurrentDate.slice(0, 10)}
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Hora de inicio</label>
                  <input
                    type="time"
                    name="date_from"
                    value={AppointmentInfo.date_from}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {validationErrors.date_from && (
                    <span className="text-red-500 text-xs">{validationErrors.date_from}</span>
                  )}
                </div>
                <div>
                  <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Hora de fin</label>
                  <input
                    type="time"
                    name="date_to"
                    value={AppointmentInfo.date_to}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {validationErrors.date_to && (
                    <span className="text-red-500 text-xs">{validationErrors.date_to}</span>
                  )}
                </div>
              </div>
              <div>
                <label className='pl-1 text-sm text-gray-600 dark:text-gray-300'>Observaciones</label>
                <textarea
                  name="obs"
                  value={AppointmentInfo.obs}
                  onChange={handleChange}
                  placeholder="Añadir observaciones..."
                  className="w-full mt-2 border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  id="theme-toggle"
                  className={`px-4 py-2 w-full rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600 ${!formChanged ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!formChanged}
                >
                  Editar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
