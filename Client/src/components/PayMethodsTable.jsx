import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import CreatePayMethodModal from './modals/CreatePayMethod';
import EditPayMethodModal from './modals/EditPayMethod';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import getParamsEnv from '../functions/getParamsEnv';
import ToasterConfig from './Toaster'
import { IoIosAddCircle } from "react-icons/io";
import { getPayMethods } from '../redux/actions';
import Loader from './Loader';

const { API_URL_BASE } = getParamsEnv()


const PayMethodsTable = ({ methods }) => {

  const [showCreatePayMethodModal, setShowCreatePayMethodModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [ShowEditPayMethodModal, setShowEditPayMethodModal] = useState(false)
  const [filaPayMethod, setFilaPayMethod] = useState(null)
  const [methodId, setMethodId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector((state) =>  state?.token)
  const [aux, setAux] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(getPayMethods({token}))
    setIsLoading(false)

  },[aux])

  
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${API_URL_BASE}/deletepayment/${methodId}`,
        { token }
      );
      if (response.data.deleted === "ok") {
        setAux(!aux)
        toast.success("Procedimiento eliminado exitosamente");

        setMethodId(null);
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
    setMethodId(id);
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
    setShowCreatePayMethodModal(true)
  }

 

  const handleEditModal = (filaPayMethod) => {
    console.log(filaPayMethod,"probando aca")
    setShowEditPayMethodModal(true)
    setFilaPayMethod(filaPayMethod)
  }

  if(!isLoading) {
    return (
      <>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="border border-black w-full text-sm text-left rtl:text-right text-black dark:text-beige dark:border-beige">
              <thead className="bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-grey">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <button className='flex flex-row gap-1 p-2 rounded-full hover:bg-primaryPink' onClick={handleShowCreateModal}><IoIosAddCircle size={20} /> Agregar</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {methods.map((fila, index) => (
                  <tr
                    key={index}
                    className="text-s hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                  >
                    <td className="px-4 py-4">{fila.paymentMethodName}</td>
                    <td className="px-4 py-4">
                      <button
                        className=" hover:bg-blue-700 text-black px-2 py-1 rounded mr-2"
                        onClick={() => handleEditModal(fila)}
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
        {showCreatePayMethodModal &&
          <CreatePayMethodModal aux={aux} setAux={setAux}  token={token} setShowCreatePayMethodModal={setShowCreatePayMethodModal}/>
        }
        {ShowEditPayMethodModal && filaPayMethod &&
          <EditPayMethodModal aux={aux} setAux={setAux} filaPayMethod={filaPayMethod} token={token} setShowEditPayMethodModal={setShowEditPayMethodModal} />
        }
        {showDeleteConfirmation && methodId && (
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
    <Loader />
  }
};

export default PayMethodsTable;