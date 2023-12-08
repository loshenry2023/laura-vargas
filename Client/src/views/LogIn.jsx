// hooks, routers, reducers:
import React from "react";
import { GiExitDoor } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
const { ROOT } = getParamsEnv();

//Firebase
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../firebase/firebaseConfig";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LogIn = () => {
  const handleGoogle = async () => {
    const dataUser = await signInWithPopup(auth, provider);
    axios.post(data.user.email)
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
              <Link to={ROOT}> <GiExitDoor className="h-8 w-8" /> </Link>
            </div>  
            <button className="w-full px-4 py-2 border flex justify-center  gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <AiFillFacebook className="h-6 w-6 text-blue-900"/>
              <span className="text-black">Login with Facebook</span>
            </button>
            <button onClick={handleGoogle} className="w-full px-4 py-2 border flex justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <FcGoogle className="h-6 w-6"/>
              <span className="text-black">Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
