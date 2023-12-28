import React, { useState, useEffect } from 'react'

import { IoClose } from 'react-icons/io5';
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { getCalendar } from '../../redux/actions';
import getParamsEnv from '../../functions/getParamsEnv';
const { API_URL_BASE } = getParamsEnv()
import converterGMT from '../../functions/converteGMT';
import validateCreateAppointment from '../../functions/createAppointmentValidations';

const CreateAppointment = ({ setShowAppointmentModal, dateInfo, token, setRefrescarCita, refrescarCita, chosenClient }) => {

    const userSpecialist = useSelector((state) => state?.user)

    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch()

    const specialistName = `${dateInfo.specialist.name} ${dateInfo.specialist.lastName}`
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();

    const [AppointmentInfo, setAppointmentInfo] = useState({
        clientName: dateInfo.client.name || "",
        clientLastName: dateInfo.client.lastName || "",
        branch: dateInfo.branch.branchName || "",
        service: dateInfo.service.name || "",
        date: dateInfo.dateTime.$d || formattedCurrentDate,
        specialist: specialistName || "",
        date_from: "",
        date_to: "",
        obs: ""
    })

    const closeModal = () => {
        setShowAppointmentModal(false)
    }



    const handleChange = (e) => {
        const { name, value } = e.target;


        setAppointmentInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));


        const validationErrors = validateCreateAppointment({
            ...AppointmentInfo,
            [name]: value,
        });


        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };




    function formatDateTime(date, time) {
        const dateObject = new Date(date);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
        const formattedDateTime = `${formattedDate} ${time}`;
        return formattedDateTime;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDateFrom = formatDateTime(AppointmentInfo.date, AppointmentInfo.date_from);
        const formattedDateTo = formatDateTime(AppointmentInfo.date, AppointmentInfo.date_to);

        try {
            const data = {
                date_from: formattedDateFrom,
                date_to: formattedDateTo,
                obs: AppointmentInfo.obs || " ",
                idBranch: dateInfo.branch.id,
                idUser: dateInfo.specialist.id,
                idService: dateInfo.service.id,
                idClient: dateInfo.client.id,
                token: token
            };

            const response = await axios.post(`${API_URL_BASE}/newcalendar`, data);


            const sendEmail = {
                origin: userSpecialist.userName,
                target: chosenClient.email,
                subject: "Laura Vargas - Reserva de Cita",
                html: `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html dir='ltr' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'> <head> <meta charset='UTF-8'> <meta content='width=device-width, initial-scale=1' name='viewport'> <meta name='x-apple-disable-message-reformatting'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta content='telephone=no' name='format-detection'> <title></title>     <link href='https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i' rel='stylesheet'>  </head> <body> <div dir='ltr' class='es-wrapper-color' style='color:black'>  <table class='es-wrapper' width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-email-paddings' valign='top'> <table cellpadding='0' cellspacing='0' class='es-header esd-footer-popover' align='center'> <tbody> <tr> <td class='esd-stripe' align='center' esd-custom-block-id='35507'> <table bgcolor='#ffffff' class='es-header-body' align='center' cellpadding='0' cellspacing='0' width='550' style='border-right:1px solid transparent;border-bottom:1px solid transparent;'> <tbody> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-container-frame' width='509' valign='top' align='center'> <table width='100%' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='esd-block-image' align='center' style='font-size: 0px;'><a target='_blank' href='https://laura-vargas-dkpl.vercel.app/'><img src='https://res.cloudinary.com/doyafxwje/image/upload/v1703605216/Logos/LogoLauraVargas_zhiwgn.jpg' alt style='display: block;' class='adapt-img' width='140' height='110'></a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text'> <h1 style='text-align: left; font-size: 22px; line-height: 120%;'></h1> <h1 style='text-align: left; font-size: 22px; line-height: 120%;'>Hola, ${chosenClient.name} ${chosenClient.lastName}👋</h1> <h1 style='text-align: left; font-size: 16px; line-height: 120%;'></h1> <p style='text-align: left; font-size: 16px; line-height: 120%;'><strong>Confirmamos tu cita</strong><br>Tu cita en ${dateInfo.branch.branchName} fue confirmada el día ${formattedDateFrom}, no te pierdas los detalles de tu cita.</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text' style='font-size:18'> <p style='font-weight:bold; font-size:16px'>📅 Dia y horario: <span style='font-weight:normal'> ${formattedDateFrom} </span></p> <p style='font-weight:bold; font-size:16px'>🏠 Sede: <span style='font-weight:normal'> ${dateInfo.branch.branchName}, Bogotá, Colombia </span></p> <p style='font-weight:bold; font-size:16px'>💄 Servicio: <span style='font-weight:normal'> ${AppointmentInfo.service} </span></p> <p style='font-weight:bold; font-size:16px'>🙎‍♀️ Profesional: <span style='font-weight:normal'> ${AppointmentInfo.specialist}</span></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left' > <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-text'> <p style='font-size: 16px; margin-bottom: 2px;'>❗<em> Sólo se tolerarán 15 minutos de retraso. Pasado este tiempo el turno se da por cancelado</em></p> <p style='font-size: 16px; margin-bottom: 2px'> Gracias por confiar en nosotras!</p> <p style='font-size: 16px; margin-bottom: 40px;'> En caso de no poder concurrir, por favor cancelá la reserva.</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p20r es-p20l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='509' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td align='left' class='esd-block-button'><span class='es-button-border' style='border-right-width: 1px; border-color: #2d2f2d; background: #f4cccc; border-radius: 8px; margin-top:10px'><a href='www.google.com.ar' class='es-button es-button-1703610375570' target='_blank' style='background: #f4cccc; color: #090808; text-decoration: none;font-size: 16px; font-weight: bold; padding: 15px 25px; border-radius: 8px; mso-border-alt: 10px solid #f4cccc'>Cancelar Cita <img src='https://ecyarqo.stripocdn.email/content/guids/CABINET_29672de16276e54ca263b524d330d287acfebaaa50d1fa6f185ee0e5a6f8a5a1/images/asd_ZZz.png' alt='icon' class='esd-icon-right' align='absmiddle' style='margin-left: 6px;' height='17'>  </a></span></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td class='esd-structure es-p10b es-p10r es-p5l' align='left'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td width='534' class='esd-container-frame' align='center' valign='top'> <table cellpadding='0' cellspacing='0' width='100%'> <tbody> <tr> <td class='esd-block-social' align='right' style='font-size: 0px;'> <table class='es-table-not-adapt es-social' cellspacing='0' cellpadding='0' style='margin-top: 10px'> <tbody> <tr> <td class='es-p35r' valign='top' align='center'><a target='_blank' href='https://www.facebook.com/lauravargas.cp/'><img style='margin-right: 10px;' title='Facebook' src='https://ecyarqo.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png' alt='Fb' width='32' height='32'></a></td> <td valign='top' align='center'><a target='_blank' href='https://www.instagram.com/lauravargas.cpmu/'><img title='Instagram' src='https://ecyarqo.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png' alt='Inst' width='32' height='32'></a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </body> </html>`,
                token: token
            }

            if (response.data.created === "ok") {
                dispatch(getCalendar(dateInfo.branch.id, { token: token }))

                toast.success("Cita creada exitosamente")
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
                    )

                }, 3000);
                axios.post(`${API_URL_BASE}/sendmail`, sendEmail)
                setRefrescarCita(!refrescarCita)
            } else {
                toast.error("Hubo un problema con la creación");
            }
        } catch (error) {
            //console.error(error);
            const errorMessage = error.response ? error.response.data : 'An error occurred';
            toast.error(`Hubo un problema con la creacion. ${errorMessage}`);
        }
    };

    return (

        <div>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black" style={{ background: "rgba(0, 0, 0, 0.70)" }}>
                <div className="container">
                    <div className="w-full bg-white shadow rounded-lg p-6 md:mx-auto md:w-1/2 2xl:w-1/3 dark:bg-darkBackground">
                        <div className='flex justify-between'>
                            <h1 className="text-xl font-semibold mb-4 text-black dark:text-darkText">Agregar Cita</h1>
                            <IoClose onClick={closeModal} className='cursor-pointer hover:scale-125 mt-2 w-5 h-5 dark:text-darkText' />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div>
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Nombre de cliente</label>
                                    <input
                                        placeholder="Nombre de cliente"
                                        className="border border-black p-2 rounded w-full bg-gray-200"
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
                                        className="border border-black p-2 rounded w-full bg-gray-200"
                                        onChange={handleChange}
                                        type="text"
                                        name="clientLastName"
                                        value={AppointmentInfo.clientLastName}
                                        disabled
                                    />

                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">

                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Sede</label>
                                    <input
                                        placeholder="Sede"
                                        className="border border-black p-2 rounded w-full bg-gray-200"
                                        onChange={handleChange}
                                        type="text"
                                        name="branch"
                                        value={AppointmentInfo.branch}
                                        disabled
                                    />

                                </div>
                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Procedimeinto</label>
                                    <input
                                        placeholder="Procedimiento"
                                        className="border border-black p-2 rounded w-full bg-gray-200"
                                        onChange={handleChange}
                                        type="text"
                                        name="service"
                                        value={AppointmentInfo.service}
                                        disabled
                                    />

                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Fecha</label>
                                    <input
                                        placeholder="Fecha"
                                        className="border border-black p-2 rounded w-full bg-gray-200"
                                        onChange={handleChange}
                                        type="text"
                                        name="date"
                                        value={AppointmentInfo.date}
                                        disabled
                                    />

                                </div>
                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Especialista</label>
                                    <input
                                        placeholder="Especialista"
                                        className="border border-black p-2 rounded w-full bg-gray-200"
                                        onChange={handleChange}
                                        type="text"
                                        name="specialist"
                                        value={AppointmentInfo.specialist}
                                        disabled
                                    />

                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Hora de inicio</label>
                                    <input
                                        placeholder="Hora de inicio"
                                        className="border border-black p-2 rounded w-full"
                                        onChange={handleChange}
                                        type="time"
                                        name="date_from"
                                        value={AppointmentInfo.date_from}
                                    />
                                    {validationErrors.date_from && (
                                        <div className="text-red-500 text-sm">{validationErrors.date_from}</div>
                                    )}

                                </div>
                                <div className="first-letter:grid grid-cols-1 mb-2">
                                    <label className='pl-1 text-sm font-bold dark:text-darkText'>Hora de finalización</label>
                                    <input
                                        placeholder="Hora de finalización"
                                        className="border border-black p-2 rounded w-full"
                                        onChange={handleChange}
                                        type="time"
                                        name="date_to"
                                        value={AppointmentInfo.date_to}
                                    />
                                    {validationErrors.date_to && (
                                        <div className="text-red-500 text-sm">{validationErrors.date_to}</div>
                                    )}

                                </div>
                            </div>
                            <div className="first-letter:grid grid-cols-1 mb-2">
                                <label className='pl-1 text-sm font-bold dark:text-darkText'>Observaciones</label>
                                <textarea
                                    placeholder="Observaciones"
                                    className="border border-black p-2 rounded w-full"
                                    onChange={handleChange}
                                    name="obs"
                                    value={AppointmentInfo.obs}
                                />
                            </div>

                            <button
                                type="submit"
                                id="theme-toggle"
                                className="px-4 py-2 w-full rounded bg-primaryPink shadow shadow-black text-black hover:bg-blue-600 focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary dark:hover:bg-blue-600"
                            >
                                Crear Cita
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAppointment
