//hooks, componentes, reducer
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranches, getSpecialties, getUsers } from "../redux/actions";
import RegisterForm from "../components/modals/RegisterForm";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProfilesTable from "../components/ProfilesTable";
import Loader from "../components/Loader";
import "./loading.css"

//icons
import { IoPersonAddOutline } from "react-icons/io5";

function UserProfiles() {
  const dispatch = useDispatch();
  const [showResgisterFormModal, setShowResgisterFormModal] = useState(false);
  const [activarNuevoUsuario, setActivarNuevoUsuario] = useState(false)
  const [loading, setLoading] = useState(true)

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
  

  const branches = useSelector((state) => state?.branches);
  const specialties = useSelector((state) => state?.specialties);
  const count = useSelector((state) => state?.count);
  const user = useSelector((state) => state?.user);
  const users = useSelector((state) => state?.users);
  const token = { token: user.token }
  const tokenID = token.token


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
        createDateStart,
        token
      )
    )
    .then(dispatch(getBranches(token)))
    .then(dispatch(getSpecialties(token)))
    .then(() => {setLoading(false)})
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
    activarNuevoUsuario
  ]);

  const handleShowProfilesModal = () => {
    setShowResgisterFormModal(true);
  };

  const pagination = Math.ceil(count / size);


  return (
    <div>
      <NavBar />
      <div className="flex flex-row dark:bg-darkBackground">
        <SideBar /> 
        {loading ? <Loader /> : (
          <div className="flex flex-col mt-10 gap-5 w-2/3 mx-auto"> 
            <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left" >Plantilla de empleados</h1>
            <section className="flex flex-col gap-2 mx-auto sm:flex sm:flex-row sm:gap-5 sm:w-full">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">Fecha inicial</label>
                  <input
                    onChange={(e) => {
                      setCreateDateStart(e.target.value ? `${e.target.value} 00:00:00` : "");
                    }}
                    type="date"
                    defaultValue=""
                    className="border rounded-md border-black px-2 text-sm dark:text-darkText dark:bg-darkPrimary dark:asd"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">Fecha final</label>
                  <input
                    onChange={(e) => {
                      setCreateDateEnd(e.target.value ? `${e.target.value} 23:59:59` : "");
                    }}
                    type="date"
                    defaultValue=""
                    className="border rounded-md border-black px-2 text-sm  dark:text-darkText dark:bg-darkPrimary"
                  />
                </div>
              </div>
            </section>
            <section className="flex flex-col items-start sm:w-full">
              <div className="flex flex-col items-center w-full gap-3 lg:flex-row lg:items-center lg:gap-3">
                <input
                  value={nameOrLastName}
                  onChange={(e) => {
                    setNameOrLastName(e.target.value);
                    setPage(0);
                  }}
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="w-full border border-black focus:outline-none focus:ring-1 focus:ring-grey px-1 text-sm dark:bg-darkPrimary dark:placeholder-darkText dark:text-darkText"
                />
                <select
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setPage(0);
                  }}
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
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
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
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
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
                >
                  <option value=""> -- Seleccionar Sede -- </option>
                  {branches && branches.map((branch, index) => (
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
                  className="w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
                >
                  <option value=""> -- Seleccionar Especialidad -- </option>
                  {specialties && specialties.map((branch, index) => (
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
                  className=" w-full border border-black rounded-md text-xs dark:text-darkText dark:bg-darkPrimary"
                >
                  <option value=""> -- Seleccionar Rol --</option>
                  <option value="superAdmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="especialista">Especialista</option>
                </select>
                <div className="justify-self-end">
                  {user.role === "superAdmin" ?
                      <IoPersonAddOutline
                      className="cursor-pointer h-6 w-6 dark:text-darkText"
                      onClick={handleShowProfilesModal}
                    /> : null
                  }
                </div>
              </div>
            </section>
            <section>
              <ProfilesTable
                count={count}
                users={users} />
              {showResgisterFormModal ? (
                <RegisterForm
                  setShowResgisterFormModal={setShowResgisterFormModal}
                  specialties={specialties}
                  branches={branches}
                  tokenID={tokenID}
                  setActivarNuevoUsuario={setActivarNuevoUsuario}
                />
              ) : null}
            </section>
            <section className="flex flex-col items-center gap-5">
            <select
                name=""
                id=""
                defaultValue={10}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPage(0);
                }}
                className="shadow shadow-black rounded-md dark:text-darkText dark:bg-darkPrimary"
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
                <div>
                <button
                  onClick={
                    page
                      ? () => {
                        setPage(page - 1);
                      }
                      : null
                  }
                  className="dark:text-darkText"
                >
                  {" "}
                  {"<"}
                </button>
                <span className="dark:text-darkText"> {page + 1} de {pagination} </span>
                <button
                  onClick={
                    page < pagination - 1
                      ? () => {
                        setPage(page + 1);
                      }
                      : null
                  }
                  className="dark:text-darkText"
                >
                  {">"}
                </button>
                </div>
            </section>
          </div>)}
       </div> 
      </div>
  )
}

export default UserProfiles;