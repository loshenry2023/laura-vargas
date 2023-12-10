//hooks, reducer
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranches, getSpecialties, getUsers } from "../redux/actions";

//icons
import { IoPersonAddOutline } from "react-icons/io5";

//components
import RegisterForm from "../components/modals/RegisterForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProfilesTable from "../components/ProfilesTable";

function UserProfiles() {
  const [showResgisterFormModal, setShowResgisterFormModal] = useState(false);

  const datos = [
    {
      speciality: "pestañas",
      name: "Laura",
      lastName: "Vargas",
      email: "lauraVargas@gmail.com",
      rol: "Super Admin",
      branch: "Villavicencio",
      commission: "40%",
    },
    {
      speciality: "pestañas",
      name: "Diana",
      lastName: "Vargas",
      email: "dianaVargas@gmail.com",
      rol: "Admin",
      branch: "Villavicencio",
      commission: "40%",
    },
  ];

  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users);
  const branches = useSelector((state) => state?.branches);
  const specialties = useSelector((state) => state?.specialties);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBranches());
    dispatch(getSpecialties());
  }, []);

  const handleShowProfilesModal = () => {
    setShowResgisterFormModal(true);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col flex-wrap gap-6 items-center h-[calc(100vh-150px)] mt-10 m-auto">
          <h1 className="text-xl">Perfiles</h1>
          <div className="flex flex-col gap-2 mx-auto sm:flex sm:flex-row sm:gap-5">
            <select className="border border-black rounded-md text-xs">
              <option> -- Seleccionar Sede -- </option>
              {branches.map((branch) => (
                <option>{branch.branchName}</option>
              ))}
            </select>
            <select className="border border-black rounded-md text-xs">
              <option> -- Seleccionar Especialidad -- </option>
              {specialties.map((branch) => (
                <option>{branch.specialtyName}</option>
              ))}
            </select>
            <select className="border border-black rounded-md text-xs">
              <option> -- Seleccionar Rol --</option>
              <option value="">superAdmin</option>
              <option value="">admin</option>
              <option value="">user</option>
            </select>
            <IoPersonAddOutline
              className="self-center cursor-pointer h-6 w-6"
              onClick={handleShowProfilesModal}
            />
          </div>
          <ProfilesTable data={users} />
          {showResgisterFormModal ? (
            <RegisterForm
              setShowResgisterFormModal={setShowResgisterFormModal}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UserProfiles;
