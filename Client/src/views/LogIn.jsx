// hooks, routers, reducers:
import React, { useState } from "react";
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
const { ROOT } = getParamsEnv();

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passHandler = (e) => {
    setPassword(e.target.value);
    console.log(email);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit', email, password)
  };
  return (
    <section className="bg-grey">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Iniciar sesión
            </h1>
            <Link to={ROOT}><GiExitDoor className="h-8 w-8"/></Link>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Correo electrónico
                </label>
                <input
                  onChange={emailHandler}
                  type="email"
                  name="email"
                  value={email}
                  className="bg-gray-50 border text-black border-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="lvargas@cejasypestañas.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  onChange={passHandler}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button className="w-full bg-secondaryPink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-black px-5 py-2.5 text-center">
                Iniciar sesión
              </button>
              <p class="text-sm font-light text-black">
                  No tienes una cuenta? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
