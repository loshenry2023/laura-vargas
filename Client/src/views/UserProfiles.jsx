import React, { useState } from "react";
import ProfilesTable from "../components/ProfilesTable";
import { IoPersonAddOutline } from "react-icons/io5";
import RegisterForm from "../components/modals/RegisterForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

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

  const handleShowProfilesModal = () => {
    setShowResgisterFormModal(true);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col gap-4 h-[calc(100vh-150px)] mt-10 m-auto">
          <h1 className="text-xl">Perfiles</h1>
          <div className="flex flex-col gap-4 items-end">
              <IoPersonAddOutline className="cursor-pointer h-6 w-6" onClick={handleShowProfilesModal} />
              <ProfilesTable datos={datos} />
            {showResgisterFormModal ? (
              <RegisterForm
                setShowResgisterFormModal={setShowResgisterFormModal}   
              />
            ) : null}
          </div>
        </div>
      </div>    
    </>
  );
}

export default UserProfiles;
