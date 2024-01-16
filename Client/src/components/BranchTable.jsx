import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import CreateBranchModal from './modals/CreateBranchModal';
import EditBranchModal from './modals/EditBranchModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import getParamsEnv from '../functions/getParamsEnv';
import ToasterConfig from './Toaster'
import { IoIosAddCircle } from "react-icons/io";
import { getBranches } from '../redux/actions';
import Loader from './Loader';

const { API_URL_BASE } = getParamsEnv()


const BranchTable = ({ branches }) => {

  const [showCreateBranchModal, setShowCreateBranchModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showEditBranchModal, setShowEditBranchModal] = useState(false)
  const [filaBranch, setFilaBranch] = useState(null)
  const [branchId, setBranchId] = useState(null)
  const specialties = useSelector((state) => state?.specialties)
  const token = useSelector((state) => state?.token);
  const [aux, setAux] = useState()
  const [isLoading, setIsLoading] = useState(false)


  const dispatch = useDispatch()

  console.log(branches)

  useEffect(() => {
    setIsLoading(true)
    dispatch(getBranches({ token }))
    setIsLoading(false)
  }, [aux])


  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${API_URL_BASE}/deletebranch/${branchId}`,
        { token }
      );
      if (response.data.deleted === "ok") {
        setAux(!aux)
        toast.success("Sede eliminado exitosamente");

        setBranchId(null);
      } else {
        toast.error("Hubo un problema al eliminar Sede");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data
        : "An error occurred";
      toast.error(`Hubo un problema al eliminar Sede. ${errorMessage}`);
    }
  };


  const handleDeleteModal = (id) => {
    setBranchId(id);
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
    console.log("modal")
    setShowCreateBranchModal(true)
  }



  const handleEditBranchModal = (filaBranch) => {
    setShowEditBranchModal(true)
    setFilaBranch(filaBranch)
  }

  if (!isLoading) {
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
                    Dirección
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Teléfono
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <button className='flex flex-row gap-1 p-2 rounded-full hover:bg-primaryPink' onClick={handleShowCreateModal}><IoIosAddCircle size={20} /> Agregar</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {branches
                  .slice()
                  .sort((a, b) => a.branchName.localeCompare(b.branchName))
                  .map((fila, index) => (
                    <tr
                      key={index}
                      className="text-xs hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                    >
                      <td className="px-4 py-4">{fila.branchName}</td>
                      <td className="px-4 py-4">{fila.address}</td>
                      <td className="px-4 py-4">{fila.phoneNumber}</td>
                      <td className="px-4 py-4">
                        <button
                          className="hover:bg-blue-700 text-black px-2 py-1 rounded mr-2"
                          onClick={() => handleEditBranchModal(fila)}
                        >
                          <MdEdit size={25} />
                        </button>
                        <button
                          className="hover:bg-red-700 text-black px-2 py-1 rounded"
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
        {showCreateBranchModal &&
          <CreateBranchModal aux={aux} setAux={setAux} token={token} setShowCreateBranchModal={setShowCreateBranchModal} />
        }
        {showEditBranchModal &&
          <EditBranchModal aux={aux} setAux={setAux} filaBranch={filaBranch} token={token} setShowEditBranchModal={setShowEditBranchModal} specialties={specialties} />
        }
        {showDeleteConfirmation && branchId && (
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

export default BranchTable;