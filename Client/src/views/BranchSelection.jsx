//hooks, reducer, components
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//icons
import { IoClose } from 'react-icons/io5';

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
import { setBranch } from "../redux/actions";
const { HOME, AGENDA} = getParamsEnv();

const BranchSelection = () => {
const [workingBranch, setWorkingBranch] = useState({})
const [isButtonDisabled, setButtonDisabledState] = useState(true);

  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();



const handleChange = (e) => {
    const branchObject = JSON.parse(e.target.value);
    setWorkingBranch(branchObject)
    setButtonDisabledState(false);
}

const handleBranch = () => {
    dispatch(setBranch(workingBranch))
    if(user.role !== "especialista"){
      navigate(HOME)
    } else {
      navigate(AGENDA)
    }
}

  return (
    <section className="bg-[url('https://res.cloudinary.com/doyafxwje/image/upload/v1703630993/LogIn/osoq2vut2vy2fivyauxm.jpg')] bg-cover bg-center flex flex-col items-center justify-center h-screen lg:py-0">
      <div className="relative flex flex-col items-center justify-center gap-5 rounded-xl w-fit p-10 mx-auto lg h-fit bg-white border shadow-xl shadow-black border-black">
      <IoClose onClick={() => navigate(-1)} className="absolute top-3 right-3 h-5 w-5 cursor-pointer hover:scale-110"/>
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold mb-2">¡Hola {user.name}! ¿Cómo estás?</h1>
        <h2 className="text-xl">Haz clic en la sede en la que trabajarás hoy 👇</h2>
      </div>
      <div className="flex flex-row gap-5">
      {user.branches.map((branch, index) => {
        return (
          <div key={index} className="flex flex-row gap-1">
            <input
              type="radio"
              id={branch.branchName}
              name="branch"
              value={JSON.stringify(branch)}
              onChange={handleChange}
            />
            <label>{branch.branchName}</label>
          </div>
        )})}
      </div>
      <div>
        <button className={isButtonDisabled ? "font-medium cursor-not-allowed rounded shadow-sm py-2 px-4 my-2 shadow-black bg-primaryPink hover:bg-blue-600" : "cursor-pointer font-medium  rounded shadow-sm py-2 px-4 my-2 shadow-black bg-primaryPink hover:bg-blue-600"} onClick={handleBranch} disabled={isButtonDisabled}> Ingresar </button>
      </div>
    </div>
    </section>
  );
};

export default BranchSelection;
