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

  const specialties = useSelector((state) => state.specialties)
  const branches = useSelector((state) => state.branches)

  useEffect(() => {
    dispatch(getUserId(detailId));
  }, [detailId]);

  const confirmDelete = (detailId) => {
    const response = confirm("¿Estás seguro que deseas eliminar el usuario?");
    if(response === true){
      dispatch(deleteUser(detailId))
      navigate(USERPROFILES)
    }
  }
  const userID = useSelector((state) => state?.userID);

  const especialidades = userID.specialties;

  return (
    <>
    <div className="m-auto">
      <div className="container w-4/5 sm:w-full mx-auto flex flex-col ">
        <div
          className="flex flex-col md:flex-row overflow-hidden
            bg-white rounded-lg shadow-md shadow-grey w-full"
        >
          <img className="h-96 w-96 m-2 rounded-xl border-2 border-grey object-cover object-center" src={userID.image} />
          <div className=" py-2 px-6 text-gray-800 flex flex-col justify-evenly">
            <div className="flex gap-2">
              <Link to={USERPROFILES}>
                <IoMdArrowRoundBack className="h-5 w-5 mt-1" />
              </Link>
              <h3 className="underline font-semibold text-xl leading-tight truncate ">
                Perfil de {userID.name} {userID.lastName}
              </h3>
            </div>
            <h2 className="text-lg leading-tight truncate">
              Rol: <span className="text-md font-light">{userID.role}</span>
            </h2>
            <h3 className="text-lg leading-tight truncate">
              Teléfono:{" "}
              <span className="text-md font-light">{userID.phone1}</span>
            </h3>
            <h3 className="text-lg leading-tight truncate">
              Email:{" "}
              <span className="text-md font-light">
                {" "}
                {userID.notificationEmail}{" "}
              </span>
            </h3>
            <h3 className="text-lg leading-tight truncate">
              Especialidades:
              {especialidades && especialidades.length > 0 ? (
                especialidades.map((specialt, index) => (
                  <span className="text-md font-light" key={index}>
                    {" "}
                    {specialt.specialtyName}
                  </span>
                ))
              ) : (
                <span className="text-md font-light"> - </span>
              )}
            </h3>
            {/* <h3 className="text-lg leading-tight truncate">
              Sede:{" "}
              <span className="text-md font-light">
                {userID.branch.branchName}
              </span>
            </h3> */}
            <div className="flex gap-5">
              <MdEdit onClick={() => setShowEditModal(true)} className="h-6 w-6 hover:text-primaryPink hover:animate-bounce cursor-pointer delay-200" />
              <MdDelete onClick={() => confirmDelete(detailId)} className="h-6 w-6 hover:text-red-600 hover:animate-bounce cursor-pointer delay-200" />
            </div>
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
