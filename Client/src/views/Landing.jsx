import { Link } from "react-router-dom";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

//Variables de entorno
import getParamsEnv from "../functions/getParamsEnv.js";
const { LOGIN } = getParamsEnv();

const Landing = () => {
  return (
    <section className="bg-primaryPink">
        <div id="home" className="bg-[url('https://res.cloudinary.com/doyafxwje/image/upload/v1703631707/Landing/dccy66yweqbiqi8at8um.jpg')] bg-cover bg-center flex flex-col justify-between h-screen lg:py-0">
          <nav className="flex flex-row items-center justify-between px-10 h-20 bg-transparent">
            <img
              src="https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
              className="hidden text-xl font-bold h-40 w-40 sm:flex"
              alt="Logo"
            ></img>
            <ul className="flex flex-row gap-5">
              <li className="text-black hover:text-blue-500 ">
                <Link
                  to="https://www.facebook.com/lauravargas.cp/"
                  target="_blank"
                >
                  <AiFillFacebook className="h-10 w-10 cursor-pointer" />
                </Link>
              </li>
              <li className="text-black hover:text-primaryPink ">
                <Link
                  to="https://www.instagram.com/lauravargas.cpmu/"
                  target="_blank"
                >
                  <AiFillInstagram className="h-10 w-10 cursor-pointer" />
                </Link>
              </li>
              <li className="flex items-center shadow-md shadow-black rounded-2xl border-1 border-black border-double bg-beige font-medium px-5 cursor-pointer hover:scale-105">
                <Link to={LOGIN}>Iniciar sesión</Link>
              </li>
            </ul>
          </nav>
          <div>
          <h1 className="w-full text-center text-[100px] font-bold font-fontTitle tracking-widest ">
            Laura Vargas
          </h1>
          <h5 className="text-center text-4xl font-fontSubTitle">
              Cejas y Pestañas
          </h5>
          </div>
            <footer
            className="text-sm flex justify-end items-center h-20 pr-10">
            <Link className="font-medium hover:underline" to={""}>
              About
            </Link>
          </footer>
        </div>
        {/* <div className="grid grid-cols-1 place-items-center gap-10 mb-5 place-content-between sm:grid-cols-2 2xl:grid-cols-4 2xl:my-auto ">
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/a2ugvpzuvmjquvsyiwbk.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
            <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">
              Servicios personalizados
            </span>
          </div>
          <div className=" w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
            <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">
              Eyelashes extensions
            </span>
          </div>
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824309/Landing/eetjnrejl6r30zhcy5md.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
            <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">
              Hydra Glow
            </span>
          </div>
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824196/Landing/izc72gdriptgh8cf4oft.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
            <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">
              Microblading
            </span>
          </div>
        </div> */}
      </section>
  );
};

export default Landing;
