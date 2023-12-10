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

  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [branch, setBranch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [role, setRole] = useState("");
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");

  const dispatch = useDispatch();
  const branches = useSelector((state) => state?.branches);
  const specialties = useSelector((state) => state?.specialties);

  useEffect(() => {
    dispatch(
      getUsers(
        nameOrLastName,
        attribute,
        order,
        page,
        size,
        branch,
        specialty,
        role,
        createDateEnd,
        createDateStart
      )
    );
    dispatch(getBranches());
    dispatch(getSpecialties());
  }, [
    nameOrLastName,
    attribute,
    order,
    page,
    size,
    branch,
    specialty,
    role,
    createDateEnd,
    createDateStart,
  ]);

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
            <div>
            <label htmlFor="">Fecha inicial</label>
            <input
              onChange={(e) => {
                setCreateDateStart(`${e.target.value} 00:00:00`);
              }}
              type="date"
              defaultValue=""
              className="border rounded-md border-black px-4 text-sm"
            />
            <label htmlFor="">Fecha final</label>
            <input
              onChange={(e) => {
                setCreateDateEnd(`${e.target.value} 23:59:59`);
              }}
              type="date"
              defaultValue=""
              className="border rounded-md border-black px-4 text-sm"
            />
            </div>
          </div>
          <div>
            <input
              value={nameOrLastName}
              onChange={(e) => {
                setNameOrLastName(e.target.value);
                setPage(0);
              }}
              type="text"
              placeholder="Buscar por nombre..."
              className="border rounded-md border-black px-4 text-sm"
            />
            <select
              onChange={(e) => {
                setBranch(e.target.value);
                setPage(0);
              }}
              className="border border-black rounded-md text-xs"
            >
              <option value=""> -- Seleccionar Sede -- </option>
              {branches.map((branch, index) => (
                <option key={index} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setSpecialty(e.target.value);
                setPage(0);
              }}
              className="border border-black rounded-md text-xs"
            >
              <option value=""> -- Seleccionar Especialidad -- </option>
              {specialties.map((branch, index) => (
                <option key={index} value={branch.specialtyName}>
                  {branch.specialtyName}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setRole(e.target.value);
                setPage(0);
              }}
              className="border border-black rounded-md text-xs"
            >
              <option value=""> -- Seleccionar Rol --</option>
              <option value="superAdmin">superAdmin</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
            <IoPersonAddOutline
              className="self-center cursor-pointer h-6 w-6"
              onClick={handleShowProfilesModal}
            />
          </div>
          <ProfilesTable />
          {showResgisterFormModal ? (
            <RegisterForm
              setShowResgisterFormModal={setShowResgisterFormModal}
            />
          ) : null}
          <select name="" id="" defaultValue={1} onChange={(e) => {
                setSize(e.target.value)
                setPage(0);
              }}>
            {" "}
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={4}>5</option>
            <option value={4}>6</option>
            <option value={4}>7</option>
            <option value={4}>8</option>
            <option value={4}>9</option>
            <option value={4}>10</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default UserProfiles;
