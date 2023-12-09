import React, { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import RegisterForm from "../components/modals/RegisterForm";
import ProfilesTable from "../components/ProfilesTable";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

function Profiles() {
  const [showResgisterFormModal, setShowResgisterFormModal] = useState(false);

  const datos = [
    {
      speciality: "pestañas",
      name: "Laura Vargas",
      email: "lauraVargas@gmail.com",
      rol: "Super Admin",
      branch: "Villavicencio",
      commission: "40%",
    },
    {
      speciality: "pestañas",
      name: "Diana Vargas",
      email: "dianaVargas@gmail.com",
      rol: "Admin",
      branch: "Villavicencio",
      commission: "40%",
    },
  ];

  const handleShowProfilesModal = () => {
    setShowResgisterFormModal(true);
  };

  const handleCloseModal = () => {
    setShowResgisterFormModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <div
          className={`flex h-[calc(100vh-80px)] items-center justify-center m-auto`}
        >
          <div>
            <h1 className="text-[25px]">Perfiles</h1>
            <div className="mt-[40px] text-right pr-4 pb-5 justify-self-end">
              <IoPersonAddOutline onClick={handleShowProfilesModal} size={30} />
            </div>
            <div className="">
              <ProfilesTable datos={datos} />
            </div>
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

export default Profiles;
