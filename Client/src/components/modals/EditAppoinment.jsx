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

  const userSpecialist = useSelector((state) => state?.user)
  const workingBranch = useSelector((state) => state?.workingBranch)
  const startTime = new Date(date.date_from);
  const startHour = startTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const endTime = new Date(date.date_to);
  const endHour = endTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const onlyDate = date.date_from;
  const dateTime = onlyDate.slice(0, 10);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const allBranches = useSelector((state) => state?.branches);

  const filteredBranch = allBranches.find(branch => branch.branchName === workingBranch.branchName)
  const address = filteredBranch.address
  const phoneNumber = filteredBranch.phoneNumber

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

    // Validate the specific field
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
    } else {
      setAppointmentInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  function formatDateTime(date, time) {
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    const formattedDateTime = `${formattedDate} ${time}`;
    return formattedDateTime;
  }

  console.log(date)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDateFrom = `${AppointmentInfo.date} ${AppointmentInfo.date_from}`;
    const formattedDateTo = `${AppointmentInfo.date} ${AppointmentInfo.date_to}`;

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


  /*       const errors = validateEditAppointment(data);
        console.log(errors)
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
      
 */
    try {
      const response = await axios.put(`${API_URL_BASE}/calendar/${date.id}`, data);

      const sendEmail = {
        origin: userSpecialist.userName,
        target: date.Client.email,
        subject: "Laura Vargas - Modificación de Cita",
        html: `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html dir='ltr' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'> <head> <meta charset='UTF-8'> <meta content='width=device-width, initial-scale=1' name='viewport'> <meta name='x-apple-disable-message-reformatting'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta content='telephone=no' name='format-detection'> <title></title>     <link href='https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i' rel='stylesheet'>  </head> <body> <div dir='ltr' class='es-wrapper-color' style='color:black'>  <table class='es-wrapper' width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-email-paddings' valign='top'> <table cellpadding='0' cellspacing='0' class='es-header esd-footer-popover' align='center'> <tbody> <tr> <td class='esd-stripe' align='center' esd-custom-block-id='35507'> <table bgcolor='#ffffff' class='es-header-body' align='center' cellpadding='0' cellspacing='0' width='550' style='border-right:1px solid transparent;border-bottom:1px solid transparent;'> <tbody> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-container-frame' width='509' valign='top' align='center'> <table width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-block-image' align='center' style='font-size: 0px;'><a target='_blank' href='https://laura-vargas-dkpl.vercel.app/'><img src='https://res.cloudinary.com/doyafxwje/image/upload/v1703605216/Logos/LogoLauraVargas_zhiwgn.jpg' alt style='display: block;' class='adapt-img' width='140' height='110'></a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text'> <h1 style='text-align: left; font-size: 22px; line-height: 120%;'></h1> <h1 style='text-align: left; font-size: 22px; line-height: 120%;'>Hola, ${date.Client.name} ${date.Client.lastName}👋</h1> <h1 style='text-align: left; font-size: 16px; line-height: 120%;'></h1> <p style='text-align: left; font-size: 16px; line-height: 120%;'><strong>Tu cita ha sido modificada</strong><br>A continuacion te dejamos los detalles de tu nueva cita: </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text' style='font-size:18'> <p style='font-weight:bold; font-size:16px'>📅 Dia: <span style='font-weight:normal'> ${formattedDateFrom.slice(0,11)} </span></p> <p style='font-weight:bold; font-size:16px'> 🕑 Horario: <span style='font-weight:normal'> ${formattedDateFrom.slice(11,16)} </span></p> <p style='font-weight:bold; font-size:16px; color:black'>🏠 Dirección: <span style='font-weight:normal'> ${address} </span></p> <p style='font-weight:bold; font-size:16px'>💄 Servicio: <span style='font-weight:normal; color:black'> ${AppointmentInfo.service.name} </span></p> <p style='font-weight:bold; font-size:16px'>🙎‍♀️ Profesional: <span style='font-weight:normal'> ${date.User.name} ${date.User.lastName}</span></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left' > <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text'> <p style='font-size: 16px; margin-bottom: 2px; color:black'>❗<em> Sólo se tolerarán 15 minutos de retraso. Pasado este tiempo el turno se da por cancelado</em></p> <p style='font-size: 16px; margin-bottom: 2px; color:black'> Gracias por confiar en nosotras!</p> <p style='font-size: 16px; margin-bottom: 40px;'> En caso de no poder concurrir, por favor cancelá la reserva llamando al  ${phoneNumber}.</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p10b es-p10r es-p5l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='534' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td class='esd-block-social' align='right' style='font-size: 0px;'> <table class='es-table-not-adapt es-social' cellspacing='0' cellpadding='0' style='margin-top: 10px'> <tbody> <tr> <td class='es-p35r' valign='top' align='center'><a target='_blank' href='https://www.facebook.com/lauravargas.cp/'><img style='margin-right: 10px;' title='Facebook' src='https://ecyarqo.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png' alt='Fb' width='32' height='32'></a></td> <td valign='top' align='center'><a target='_blank' href='https://www.instagram.com/lauravargas.cpmu/'><img title='Instagram' src='https://ecyarqo.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png' alt='Inst' width='32' height='32'></a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </body> </html>`,
        token: token
      }


      if (response.data.updated === "ok") {
        toast.success("Cita actualizada exitosamente");
        setTimeout(() => {
          closeModal();
        }, 3000);

        axios.post(`${API_URL_BASE}/sendmail`, sendEmail)
        setRefrescarCita(!refrescarCita);
      } else {
        toast.error("Hubo un problema al modificar la cita");
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'An error occurred';
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
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Nombre de cliente</label>
                  <input
                    placeholder="Nombre de cliente"
                    className="border border-black p-2 rounded w-full bg-gray-200 dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="text"
                    name="clientName"
                    value={AppointmentInfo.clientName}
                    disabled
                  />
                </div>
                <div>
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Apellido del cliente</label>
                  <input
                    placeholder="Nombre de cliente"
                    className="border border-black p-2 rounded w-full bg-gray-200 dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="text"
                    name="clientLastName"
                    value={AppointmentInfo.clientLastName}
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Sede</label>
                  <input
                    placeholder="Sede"
                    className="border border-black p-2 rounded w-full bg-gray-200 dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="text"
                    name="branchName"
                    value={workingBranch.branchName}
                    disabled
                  />
                </div>
                <div className="first-letter:grid grid-cols-1 mb-2">
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Procedimiento</label>
                  <select
                    name="service"
                    onChange={handleChange}
                    className="w-full border border-black rounded-md text-sm dark:text-darkText dark:bg-darkPrimary p-2"
                  >
                    <option value="">{AppointmentInfo.service.name}</option>
                    {services.map((service, index) => (
                      <option key={index} value={JSON.stringify(service)}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                  {validationErrors.service && (
                    <div className="text-red-500">{validationErrors.service}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="first-letter:grid grid-cols-1 mb-2">
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Fecha</label>
                  <input
                    placeholder="Fecha"
                    className="border border-black p-2 rounded w-full dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="text"
                    name="date"
                    value={AppointmentInfo.date}
                  />
                  {validationErrors.date && (
                    <div className="text-red-500">{validationErrors.date}</div>
                  )}
                </div>
                <div className="first-letter:grid grid-cols-1 mb-2">
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Especialista</label>
                  <select
                    name="specialist"
                    onChange={handleChange}
                    className="w-full border border-black rounded-md text-sm dark:text-darkText dark:bg-darkPrimary p-2"
                  >
                    {users.map((user, index) => (
                      <option key={index} value={JSON.stringify(user)}>
                        {`${user.name} ${user.lastName}`}
                      </option>
                    ))}
                  </select>
                  {validationErrors.specialist && (
                    <div className="text-red-500">{validationErrors.specialist}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="first-letter:grid grid-cols-1 mb-2">
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Hora de inicio</label>
                  <input
                    placeholder="Hora de inicio"
                    className="border border-black p-2 rounded w-full dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="time"
                    name="date_from"
                    value={AppointmentInfo.date_from}
                  />
                  {validationErrors.date_from && (
                    <div className="text-red-500">{validationErrors.date_from}</div>
                  )}
                </div>
                <div className="first-letter:grid grid-cols-1 mb-2">
                  <label className='pl-1 text-sm font-bold dark:text-darkText'>Hora de finalización</label>
                  <input
                    placeholder="Hora de finalización"
                    className="border border-black p-2 rounded w-full dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                    type="time"
                    name="date_to"
                    value={AppointmentInfo.date_to}
                  />
                  {validationErrors.date_to && (
                    <div className="text-red-500">{validationErrors.date_to}</div>
                  )}
                </div>
              </div>
              <div className="first-letter:grid grid-cols-1 mb-2">
                <label className='pl-1 text-sm font-bold dark:text-darkText'>Observaciones</label>
                <textarea
                  placeholder="Observaciones"
                  className="border border-black p-2 rounded w-full dark:text-darkText dark:bg-darkPrimary"
                  onChange={handleChange}
                  name="obs"
                  value={AppointmentInfo.obs}
                />
                {validationErrors.obs && (
                  <div className="text-red-500">{validationErrors.obs}</div>
                )}
              </div>

              <button
                type="submit"
                id="theme-toggle"
                className="px-4 py-2 w-full rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
              >
                Editar Cita
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EditAppointment;