// Importaciones de componentes y librerías
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Loader from "../components/Loader";
import CreateAppointment from "../components/modals/CreateAppointment";
import ListClients from "../components/modals/ListClients";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBranches,
  getClients,
  getServices,
  getToken,
  getUsers,
} from "../redux/actions";
import { FaPlusCircle } from "react-icons/fa";

const Agenda = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Agregar 1 ya que los meses se indexan desde 0
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const branches = useSelector((state) => state?.branches);
  const tokenID = useSelector((state) => state?.token);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const services = useSelector((state) => state?.services);
  const users = useSelector((state) => state?.users);
  const user = useSelector((state) => state?.user);
  const [nameOrLastName, setNameOrLastName] = useState("");
  const [attribute, setAttribute] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(999999999999999);
  const [branch, setBranch] = useState(workingBranch.branchName);
  const [specialty, setSpecialty] = useState("noneSpecialty");
  const [role, setRole] = useState("");
  const [createDateStart, setCreateDateStart] = useState("");
  const [createDateEnd, setCreateDateEnd] = useState("");
  const [chosenClient, setChosenClient] = useState({
    name: "Elija",
    lastName: "cliente",
  });
  const [refrescarCita, setRefrescarCita] = useState(false);
  const [showClientListModal, setShowClientListModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectServices, setSelectServices] = useState(true);

  const [dateInfo, setDateInfo] = useState({
    client: {
      id: "",
      name: "",
      lastName: "",
    },
    branch: {
      id: workingBranch.id,
      branchName: workingBranch.branchName,
    },
    service: {
      id: "",
      serviceName: "",
    },
    specialist: {
      id: "",
      name: "",
      lastName: "",
    },
    dateTime: formattedDate,
  });

  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    const isDateSelected = dateInfo.dateTime !== "";

    const formCompleted =
      dateInfo.client.id &&
      dateInfo.service.id &&
      dateInfo.specialist.id &&
      isDateSelected;

    setIsFormCompleted(formCompleted);
  }, [dateInfo]);

  const handleAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  useEffect(() => {
    dispatch(getToken(tokenID));
    dispatch(getBranches({ token: tokenID }));
    dispatch(getServices({ token: tokenID }));
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
        { token: tokenID }
      )
    ).then(() => setLoading(false));
  }, [specialty]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "client") {
      const parsedValue = JSON.parse(value);

      setDateInfo((prevInfo) => ({
        ...prevInfo,
        client: {
          id: chosenClient.id,
          name: chosenClient.name,
          lastName: chosenClient.lastName,
        },
      }));
    } else if (name === "service") {
      if (value === "noneSpecialty") {
        setDateInfo((prevInfo) => ({
          ...prevInfo,
          service: {
            id: "",
            name: "",
          },
        }));
      } else {
        const parsedValue = JSON.parse(value);

        setSpecialty(parsedValue.Specialties[0].specialtyName);

        setDateInfo((prevInfo) => ({
          ...prevInfo,
          service: {
            id: parsedValue.id,
            name: parsedValue.serviceName,
          },
        }));

        setDateInfo((prevInfo) => ({
          ...prevInfo,
          specialist: {
            id: "",
            name: "",
          },
        }));
      }
    } else if (name === "specialist") {
      if (value === "null") {
        setDateInfo((prevInfo) => ({
          ...prevInfo,
          specialist: {
            id: "",
            name: "",
            lastName: "",
          },
        }));
      } else {
        const parsedValue = JSON.parse(value);

        setDateInfo((prevInfo) => ({
          ...prevInfo,
          specialist: {
            id: parsedValue.id,
            name: parsedValue.name,
            lastName: parsedValue.lastName,
          },
        }));
      }
    } else if (name === "dateTime") {
      setDateInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value || new Date().toISOString(),
      }));
    } else {
      setDateInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setDateInfo((prevInfo) => ({
      ...prevInfo,
      client: {
        id: chosenClient.id,
        name: chosenClient.name,
        lastName: chosenClient.lastName,
      },
    }));
  }, [chosenClient]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-row dark:bg-darkBackground">
        <SideBar />
        {loading ? (
          <Loader />
        ) : (
          <div
            className={
              user.role !== "especialista"
                ? "w-full flex flex-col m-10 justify-evenly items-center 2xl:h-[calc(100vh-220px)]"
                : "w-full flex flex-col m-10 items-center 2xl:h-[calc(100vh-220px)]"
            }
          >
            <h1
              className={
                user.role !== "especialista"
                  ? "items-start text-2xl underline underline-offset-4 tracking-wide font-fontTitle dark:text-beige sm:text-left"
                  : "items-start text-2xl underline underline-offset-4 mb-10 tracking-wide font-fontTitle dark:text-beige sm:text-left"
              }
            >
              Agenda
            </h1>
            {user.role === "especialista" ? null : (
              <section className="flex flex-col flex-wrap items-center justify-center gap-5 mb-10 md:flex-row">
                <div className="mt-5 flex flex-row gap-5 sm:mt-0">
                  <FaPlusCircle
                    className="mt-1.5 cursor-pointer dark:text-darkText"
                    onClick={() => setShowClientListModal(true)}
                  />
                  <input
                    name=""
                    id=""
                    placeholder={`${chosenClient.name} ${chosenClient.lastName}`}
                    disabled
                    className="resize-y border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                  />
                </div>
                <input
                  disabled
                  value={workingBranch.branchName}
                  placeholder={workingBranch.branchName}
                  className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                ></input>
                {selectServices ? (
                  <select
                    name="service"
                    id=""
                    className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                  >
                    <option
                      defaultValue={dateInfo.service.id ? false : true}
                      value="noneSpecialty"
                    >
                      {" "}
                      Procedimientos{" "}
                    </option>
                    {services.map((service, index) => (
                      <option key={index} value={JSON.stringify(service)}>
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    name="service"
                    id=""
                    className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                    onChange={handleChange}
                  >
                    <option
                      defaultValue={dateInfo.service.id ? false : true}
                      value="noneSpecialty"
                    >
                      {" "}
                      Procedimientos{" "}
                    </option>
                  </select>
                )}

                <select
                  onChange={handleChange}
                  name="specialist"
                  id=""
                  className="border border-black rounded-md text-md dark:text-darkText dark:bg-darkPrimary"
                >
                  <option
                    defaultValue={dateInfo.specialist.id ? false : true}
                    value="null"
                  >
                    {" "}
                    -- Especialista--{" "}
                  </option>
                  {users.map(
                    (user, index) =>
                      user.role === "especialista" && (
                        <option key={index} value={JSON.stringify(user)}>
                          {user.name} {user.lastName}
                        </option>
                      )
                  )}
                </select>
              </section>
            )}
            <Calendar
              setDateInfo={setDateInfo}
              branches={branches}
              services={services}
              users={users}
              user={user}
              refrescarCita={refrescarCita}
              setRefrescarCita={setRefrescarCita}
              chosenClient={chosenClient}
              setSpecialty={setSpecialty}
              setSelectServices={setSelectServices}
            />
            <div>
              {user.role === "especialista" ? null : (
                <button
                  onClick={handleAppointmentModal}
                  disabled={!isFormCompleted}
                  className={`rounded mt-10 px-6 py-2 cursor-pointer ${
                    isFormCompleted ? "bg-primaryPink" : "bg-gray-300"
                  } shadow shadow-black text-black ${
                    isFormCompleted ? "hover:bg-blue-600" : "cursor-not-allowed"
                  } focus:outline-none transition-colors dark:text-darkText dark:bg-darkPrimary ${
                    isFormCompleted
                      ? "dark:hover:bg-blue-600"
                      : "dark:cursor-not-allowed"
                  }`}
                >
                  Agregar Cita
                </button>
              )}
            </div>
          </div>
        )}
        {showClientListModal ? (
          <ListClients
            setChosenClient={setChosenClient}
            setShowClientListModal={setShowClientListModal}
          />
        ) : null}
        {showAppointmentModal && (
          <CreateAppointment
            branches={branches}
            setShowAppointmentModal={setShowAppointmentModal}
            dateInfo={dateInfo}
            setDateInfo={setDateInfo}
            token={tokenID}
            setRefrescarCita={setRefrescarCita}
            refrescarCita={refrescarCita}
            chosenClient={chosenClient}
            formattedDate={formattedDate}
            setChosenClient={setChosenClient}
          />
        )}
      </div>
    </div>
  );
};

export default Agenda;
