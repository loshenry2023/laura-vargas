import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import CreateServiceModal from './modals/CreateServiceModal';
import EditServiceModal from './modals/EditServiceModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import getParamsEnv from '../functions/getParamsEnv';
import ToasterConfig from './Toaster'
import { IoIosAddCircle } from "react-icons/io";
import { getServices, getSpecialties } from '../redux/actions';

const { API_URL_BASE } = getParamsEnv()



const ServicesTable = () => {

  const [showCreateServiceModal, setShowCreateServiceModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showEditServiceModal, setShowEditServiceModal] = useState(false)
  const [filaService, setFilaService] = useState(null)
  const [serviceId, setServiceId] = useState(null)
  const specialties = useSelector((state) => state?.specialties)
  const token = useSelector((state) => state?.token);
  const dispatch = useDispatch()
  const [aux, setAux] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const services = useSelector((state) => state?.services);


  useEffect(() => {
    setIsLoading(true)
    console.log("cambio")
    dispatch(getServices({ token }));
    setIsLoading(false)

  }, [token, aux]);


  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${API_URL_BASE}/deleteservice/${serviceId}`,
        { token }
      );
      if (response.data.deleted === "ok") {
        setAux(!aux)
        toast.success("Procedimiento eliminado exitosamente");

        setServiceId(null);
      } else {
        toast.error("Hubo un problema al eliminar procedimiento");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data
        : "An error occurred";
      toast.error(`Hubo un problema al eliminar procedimiento. ${errorMessage}`);
    }
  };


  const handleDeleteModal = (id) => {
    setServiceId(id);
    setShowDeleteConfirmation(true);
  };

  const deleteConfirmed = (confirmed) => {
    if (confirmed) {
      setShowDeleteConfirmation(false)
      handleDelete();
    } else {
      setShowDeleteConfirmation(false);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateServiceModal(true)
  }



  const handleEditServiceModal = (filaService) => {
    setShowEditServiceModal(true)
    setFilaService(filaService)
  }


  if (!isLoading) {
    return (
      <>
        <div>
          <div className=" overflow-auto max-h-[700px] relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className=" border border-black w-full text-sm text-left rtl:text-right text-black dark:text-beige dark:border-beige">
              <thead className="bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-grey">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Especialidad
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Duracion
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Imagen
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <button className='flex flex-row gap-1 p-2 rounded-full hover:bg-primaryPink' onClick={handleShowCreateModal}><IoIosAddCircle size={20} /> Agregar</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {services
                  .slice()
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .map((fila, index) => (
                    <tr
                      key={index}
                      className=" text-xs hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                    >
                      <td className="px-4 py-4">{fila.serviceName}</td>
                      <td className="px-4 py-4">{fila.Specialties[0]?.specialtyName || '-'}</td>
                      <td className="px-4 py-4">{fila.duration} Mins</td>
                      <td className="px-4 py-4">${fila.price}</td>
                      <td className="px-4 py-4">
                        <img className='h-8 w-8' src={fila.ImageService} alt={fila.serviceName} />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className=" hover:bg-blue-700 text-black px-2 py-1 rounded mr-2"
                          onClick={() => handleEditServiceModal(fila)}
                        >
                          <MdEdit size={25} />
                        </button>
                        <button
                          className=" hover:bg-red-700 text-black px-2 py-1 rounded"
                          onClick={() => handleDeleteModal(fila.id)}
                        >
                          <MdDeleteForever size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {showCreateServiceModal &&
          <CreateServiceModal aux={aux} setAux={setAux} token={token} setShowCreateServiceModal={setShowCreateServiceModal} specialties={specialties} />
        }
        {showEditServiceModal &&
          <EditServiceModal aux={aux} setAux={setAux} filaService={filaService} token={token} setShowEditServiceModal={setShowEditServiceModal} specialties={specialties} />
        }
        {showDeleteConfirmation && serviceId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`bg-white p-6 rounded-lg shadow-lg text-center sm:flex sm:flex-col ${window.innerWidth < 340 ? "max-w-sm" : "max-w-md"
                }`}
            >
              <p className="mb-4 text-sm sm:text-base">
                ¿Estás seguro de que deseas eliminar esta cita?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => deleteConfirmed(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm sm:text-base"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => deleteConfirmed(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <ToasterConfig />
      </>
    );
  } else {
    return (
      <p>cargando</p>
    )
  }


};

export default ServicesTable;