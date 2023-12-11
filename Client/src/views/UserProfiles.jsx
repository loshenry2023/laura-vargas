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
  const count = useSelector((state) => state?.count);

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

  const pagination = Math.ceil(count / size);

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col flex-wrap gap-4 items-center h-[calc(100vh-150px)] mt-10 m-auto">
          <h1 className="text-xl">Perfiles</h1>
          <section className="flex flex-col gap-2 mx-auto sm:flex sm:flex-row sm:gap-5 sm:w-full">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex gap-2">
                <label className="hidden md:inline">Fecha inicial</label>
                <input
                  onChange={(e) => {
                    setCreateDateStart(`${e.target.value} 00:00:00`);
                  }}
                  type="date"
                  defaultValue=""
                  className="border rounded-md border-black px-2 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <label className="hidden md:inline">Fecha final</label>
                <input
                  onChange={(e) => {
                    setCreateDateEnd(`${e.target.value} 23:59:59`);
                  }}
                  type="date"
                  defaultValue=""
                  className="border rounded-md border-black px-2 text-sm"
                />
              </div>
            </div>
          </section>
          <section className="flex flex-col items-start sm:w-full">
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
              <input
                value={nameOrLastName}
                onChange={(e) => {
                  setNameOrLastName(e.target.value);
                  setPage(0);
                }}
                type="text"
                placeholder="Buscar por nombre..."
                className="border border-black focus:outline-none focus:ring-1 focus:ring-grey  px-1 text-sm"
              />
              <select
                onChange={(e) => {
                  setOrder(e.target.value);
                  setPage(0);
                }}
                className="border border-black rounded-md text-xs "
              >
                <option value="asc"> -- Ordenar por -- </option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
              <select
                onChange={(e) => {
                  setAttribute(e.target.value);
                  setPage(0);
                }}
                className="border border-black rounded-md text-xs "
              >
                <option value="createdAt"> -- Ordenar por -- </option>
                <option value="name">Nombre</option>
                <option value="lastName">Apellido</option>
                <option value="createdAt">Fecha de creación</option>
              </select>
              <select
                onChange={(e) => {
                  setBranch(e.target.value);
                  setPage(0);
                }}
                className="border border-black rounded-md text-xs "
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
              <div className="justify-self-end">
                <IoPersonAddOutline
                  className="cursor-pointer h-6 w-6"
                  onClick={handleShowProfilesModal}
                />
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center gap-5">
            <ProfilesTable />
            {showResgisterFormModal ? (
              <RegisterForm
                setShowResgisterFormModal={setShowResgisterFormModal}
                specialties={specialties}
                branches={branches}

              />
            ) : null}
            <select
              name=""
              id=""
              defaultValue={10}
              onChange={(e) => {
                setSize(e.target.value);
                setPage(0);
              }}
            >
              {" "}
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </section>
          <section>
            <button
              onClick={
                page
                  ? () => {
                    setPage(page - 1);
                  }
                  : null
              }
            >
              {" "}
              {"<"}
            </button>
            <span>{page + 1}</span>
            <button
              onClick={
                page < pagination - 1
                  ? () => {
                    setPage(page + 1);
                  }
                  : null
              }
            >
              {">"}
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default UserProfiles;
