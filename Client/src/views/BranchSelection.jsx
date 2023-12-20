import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
import { setBranch } from "../redux/actions";
const { HOME} = getParamsEnv();

const BranchSelection = () => {
const [workingBranch, setWorkingBranch] = useState("")

  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();



const handleChange = (e) => {
    setWorkingBranch(e.target.value)
}

const handleBranch = () => {
    dispatch(setBranch(workingBranch))
    (navigate(HOME))
}

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 w-fit p-10 mx-auto lg h-fit bg-beige border shadow-xl shadow-black border-black">
        <div className="text-center">
          <h1>Hola {user.name}! Cómo estás?  </h1>
          <h2> Haz click en la sede en la que trabajarás hoy 👇 </h2>
        </div>
        <div className="flex flex-row gap-5">
        {user.branches.map((branch, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                id={branch.branchName}
                name="branch"
                value={branch.branchName}
                onChange={handleChange}
                defaultChecked={index === 0}
              />
              <label>{branch.branchName}</label>
            </div>
          );
        })}
        </div>
        <div>
          <button className="cursor-pointer rounded shadow-sm px-2 my-2 shadow-black bg-primaryPink" onClick={handleBranch}> Ingresar </button>
        </div>
      </div>
    </section>
  );
};

export default BranchSelection;
