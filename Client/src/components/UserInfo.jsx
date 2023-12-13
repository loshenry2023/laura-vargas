// hooks, routers, reducers:
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserId } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./modals/EditModal.jsx";

//icons
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { USERPROFILES } = getParamsEnv();

const UserInfo = () => {
  const params = useParams();
  const detailId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showEditModal, setShowEditModal] = useState(false)

  const specialties = useSelector((state) => state?.specialties);
  const branches = useSelector((state) => state?.branches);
  const userID = useSelector((state) => state?.userID);

  useEffect(() => {
    dispatch(getUserId(detailId));
  }, [detailId]);

  const confirmDelete = (detailId) => {
    const response = confirm("¿Estás seguro que deseas eliminar el usuario?");
    if (response === true) {
      dispatch(deleteUser(detailId));
      navigate(USERPROFILES);
    }
  };

  const especialidades = userID?.specialties;
  const sedes = userID?.branch;

  return (
    <>
      <div className="w-full flex justify-center items-center dark:bg-darkBackground">
        <div
          className="mx-5 sm:mx-auto sm:w-3/5 lg:w-3/5 lg:grid lg:grid-cols-2 bg-white rounded-lg shadow-md shadow-grey dark:shadow-black dark:bg-darkPrimary"
        >
          <div className="h-full">
            <img className="rounded-xl border-2 w-full border-grey object-cover sm:h-96" src={userID?.image} />
          </div>
          <div className=" py-2 px-2 gap-2 text-gray-800 flex flex-col sm:items-start sm:justify-between">
            <div className="flex gap-2">
              <Link to={USERPROFILES}>
                <IoMdArrowRoundBack className="h-5 w-5 mt-1 dark:text-darkText" />
              </Link>
              <h2 className="underline font-semibold text-xl leading-tight sm:truncate dark:text-darkText">
                Perfil de {userID?.name} {userID?.lastName}
              </h2>
            </div>
            <h3 className="text-lg leading-tight sm:truncate dark:text-darkText">
              Usuario: <span className="text-md font-light">{userID?.userName}</span>
            </h3>
            <h3 className="flex text-lg leading-tight sm:truncate dark:text-darkText">
              Rol: <span className="text-md font-light"> {userID?.role}</span>
            </h3>
            <h3 className="text-lg leading-tight sm:truncate dark:text-darkText">
              Teléfono:{" "}
              <span className="text-md font-light sm:truncate dark:text-darkText">{userID?.phone1}</span>
            </h3>
            <h3 className="text-lg leading-tight sm:truncate dark:text-darkText">
              Email:{" "}
              <span className="text-md font-light sm:truncate dark:text-darkText">
                {" "}
                {userID?.notificationEmail}{" "}
              </span>
            </h3>
            <h3 className="text-lg leading-tight dark:text-darkText">
              Comisión: <span className="text-md font-light">{userID?.comission}%</span>
            </h3>
              <h3 className="text-lg leading-tight sm:text-base lg:text-lg dark:text-darkText">
                Especialidades:
                {especialidades &&
                  especialidades.map((specialt, index) => (
                    <span className="text-md font-light" key={index}>
                      {" "}
                      {specialt.specialtyName}
                    </span>
                  ))}
              </h3>
            <h3 className="text-lg leading-tight sm:truncate dark:text-darkText">
              Sede:{" "}
              <span className="text-md font-light sm:truncate dark:text-darkText">
                {sedes.branchName}
              </span>
            </h3>
            <div className="flex gap-5">
              <MdEdit onClick={() => setShowEditModal(true)} className="h-6 w-6 hover:text-primaryPink hover:animate-bounce cursor-pointer delay-200 dark:text-darkText dark:hover:text-primaryPink" />
              <MdDelete onClick={() => confirmDelete(detailId)} className="h-6 w-6 hover:text-red-600 hover:animate-bounce cursor-pointer delay-200 dark:text-darkText dark:hover:text-red-600" />
            </div>
          </div>
        </div>
      </div>
    {showEditModal ? (
      <EditModal
        setShowEditModal={setShowEditModal}
        specialties={specialties}
        branches={branches}
        userId={userID}
      />
    ) : null}

    </>
  );
};

export default UserInfo;
