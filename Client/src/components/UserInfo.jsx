// hooks, routers, reducers:
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserId } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

//icons
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { USERPROFILES } = getParamsEnv();

const UserInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const detailId = params.id;

  useEffect(() => {
    dispatch(getUserId(detailId));
  }, [detailId]);

  const userID = useSelector((state) => state?.userID);

  const especialidades = userID.specialties;

  return (
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
              <MdEdit className="h-6 w-6 hover:animate-bounce" />
              <MdDelete className="h-6 w-6 hover:animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-wrap gap-3 items-center h-[calc(100vh-150px)] mt-10 m-auto">
    //   <div className="w-60 h-60 overflow-hidden rounded-full">
    //     <img className="w-full h-full object-cover" src={userID.image} alt="" />
    //   </div>
    //   <div>
    //     <h1 className="underline">
    //       Perfil de {userID.name} {userID.lastName}
    //     </h1>
    //     <h2>Rol: {userID.role}</h2>
    //     <h2>Teléfono: {userID.phone1}</h2>
    //     <h2>Email: {userID.notificationEmail}</h2>
    //     <h2>Especialidades</h2>

    //   </div>
    // </div>
  );
};

export default UserInfo;
