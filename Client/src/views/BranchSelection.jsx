import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
import { setBranch } from "../redux/actions";
const { HOME} = getParamsEnv();

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
    navigate(HOME)
}

  return (
    <section className="bg-[url('https://res.cloudinary.com/doyafxwje/image/upload/v1702756196/LogIn/gynr0zwbrkjrkkqv5acv.png')] bg-cover bg-center flex flex-col items-center justify-center h-screen lg:py-0">
      <div className="flex flex-col items-center justify-center gap-5 rounded-xl w-fit p-10 mx-auto lg h-fit bg-white border shadow-xl shadow-black border-black">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold mb-2">¡Hola {user.name}! ¿Cómo estás?</h1>
        <h2 className="text-xl">Haz clic en la sede en la que trabajarás hoy 👇</h2>
      </div>
        <div className="flex flex-row gap-5">
        {user.branches.map((branch, index) => {
          return (
            <div key={index}>
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
          <button className={isButtonDisabled ? "cursor-not-allowed rounded shadow-sm py-2 px-4 my-2 shadow-black bg-primaryPink hover:bg-blue-600" : "cursor-pointer rounded shadow-sm py-2 px-4 my-2 shadow-black bg-primaryPink hover:bg-blue-600"} onClick={handleBranch} disabled={isButtonDisabled}> Ingresar </button>
        </div>
      </div>
    </section>
  );
};

export default BranchSelection;
