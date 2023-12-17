// hooks, routers, reducers:
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/actions";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast'
import { clearDataInicio } from "../redux/actions.js";

//icons
import { GiExitDoor } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv";
const { ROOT, HOME, API_URL_BASE } = getParamsEnv();

//Firebase
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import app from "../firebase/firebaseConfig";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LogIn = () => {
  const [role, setRole] = useState("");
  const [errorCredentials, setErrorCredentials] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (role === "superAdmin" || role === "admin" || role === "especialista") {
      navigate(HOME);
    }
  }, [role]);

  const handleFacebook = async () => {
    dispatch(clearDataInicio())

    try {
      const facebookUser = await signInWithPopup(auth, facebookProvider);
      const accessToken = facebookUser.user.accessToken

      const dataToValidate = {
        nameUser: facebookUser.user.email,
        idUser: accessToken,
      };

      const retrieveFacebookUser = await axios.post(
        API_URL_BASE + "/userdata",
        dataToValidate
      );

      const userData = retrieveFacebookUser.data;
      dispatch(getUser(userData));
      const { role } = userData;
      setRole(role);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setErrorCredentials("Usted ya tiene una cuenta registrada con Google");
      }
    }
  };

  const handleGoogle = async () => {
    dispatch(clearDataInicio())

    try {
      // Configuro el parámetro "prompt" para permitir seleccionar una nueva cuenta:
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      const googleUser = await signInWithPopup(auth, googleProvider);

      // Obtengo el token de acceso:
      const accessToken = await googleUser.user.getIdToken();

      const dataToValidate = {
        nameUser: googleUser.user.email,
        idUser: accessToken, // mando el gigantesco token real
      };


      const retrieveUser = await axios.post(
        API_URL_BASE + "/userdata",
        dataToValidate
      );

      const userData = retrieveUser.data;
      dispatch(getUser(userData));
      const { role } = userData;
      setRole(role);
    } catch (error) {
      if(error.message.includes("404")){{toast.error(`${error.response.data}`.charAt(0).toUpperCase() + `${error.response.data}`.slice(1))}}
      else{toast.error(error.message)}
    }
  };

  return (
    <section className="mx-auto">
      <div className="bg-[url('https://res.cloudinary.com/doyafxwje/image/upload/v1702756196/LogIn/gynr0zwbrkjrkkqv5acv.png')] bg-cover bg-center flex flex-col items-center justify-center h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Iniciar sesión
              </h1>
              <Link to={ROOT}>
                {" "}
                <GiExitDoor className="h-8 w-8" />{" "}
              </Link>
            </div>
            <button
              onClick={handleFacebook}
              className="w-full px-4 py-2 border flex justify-center  gap-2 rounded-lg border-slate-700 hover:bg-grey hover:text-white transition-color duration-700 ease-in-out"
            >
              <AiFillFacebook className="h-6 w-6 text-blue-900" />
              <span>Iniciar sesión con Facebook</span>
            </button>
            <button
              onClick={handleGoogle}
              className="w-full px-4 py-2 border flex justify-center gap-2 rounded-lg border-slate-700 hover:bg-grey hover:text-white transition-color duration-700 ease-in-out "
            >
              <FcGoogle className="h-6 w-6" />
              <span>Iniciar sesión con Google</span>
            </button>
            {errorCredentials ? (
              <p className="text-red-500 text-sm font-semibold ">
                {errorCredentials}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          zIndex: 1000, // Puedes ajustar este valor según tus necesidades
          // Otros estilos aquí
        }}
        toastOptions={{
          // Define default options
          error: {
            duration: 5000,
            theme: {
              primary: 'pink',
              secondary: 'black',
            },
            style: {
              background: '#C43433',
              color: '#fff',
            }
          },
        }}
      />
    </section>
  );
};

export default LogIn;
