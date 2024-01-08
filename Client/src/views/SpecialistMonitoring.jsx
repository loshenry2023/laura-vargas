//Hooks, components, reducer
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import SpecialistTable from "../components/SpecialistTable";
import { useSelector, useDispatch } from "react-redux";
import { setTokenError } from "../redux/actions";
import Loader from "../components/Loader";
import axios from "axios";
import Restricted from "./Restricted";
import ErrorToken from "./ErrorToken";

const SpecialistMonitoring = () => {
  const dispatch = useDispatch();
  const [specialistData, setSpecialsit] = useState({})
  const [loading, setLoading] = useState(true);
  const count = specialistData.count
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);
  const tokenError = useSelector((state) => state?.tokenError);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


  const [filterDate, setFitlerDate] = useState({
    branchName: workingBranch.branchName,
    dateFrom: formattedDate,
    dateTo: formattedDate,
    token,
  })

  console.log(specialistData)


  const handleDate = (e) => {
    setFitlerDate(
      {
        ...filterDate,
        [e.target.name]: e.target.value
      }
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3001/laura-vargas/getbalance`,
          filterDate
        );
        setSpecialsit(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.request.status === 401 || error.request.status === 403) {
          dispatch(setTokenError(error.request.status));
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [filterDate, tokenError]);


  if (tokenError === 401 || tokenError === 403) {
    return (
      <ErrorToken error={tokenError} />
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="flex flex-row dark:bg-darkBackground">
          <SideBar />
          {loading ? (
            <Loader />
          ) : user.role === "superAdmin" ? (
            <div className="flex flex-col mt-10 gap-5 w-2/3 mx-auto">
              <div className="flex gap-2">
                <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle text-black dark:text-darkText sm:text-left">
                  {" "}
                  Seguimiento Especialistas{" "}
                </h1>
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">
                    Fecha inicial
                  </label>
                  <input
                    name="dateFrom"
                    type="date"
                    defaultValue={formattedDate}
                    onChange={handleDate}
                    className="border rounded-md border-black px-2 text-sm dark:invert"
                  />
                </div>
                <div className="flex gap-2">
                  <label className="hidden md:inline dark:text-darkText">
                    Fecha final
                  </label>
                  <input
                    name="dateTo"
                    type="date"
                    defaultValue={formattedDate}
                    onChange={handleDate}
                    className="border rounded-md border-black px-2 text-sm dark:invert"
                  />
                </div>
              </div>
              <SpecialistTable count={count} specialistData={specialistData.rows} />
            </div>
          ) : (
            <Restricted />
          )}
        </div>
      </>
    )
  }
};

export default SpecialistMonitoring;
