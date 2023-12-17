import { Link } from "react-router-dom";
import getParamsEnv from "../functions/getParamsEnv.js";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const { LOGIN, TERMSANDPRIVACY } = getParamsEnv();

const Landing = () => {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <nav
          className="flex items-center justify-between px-10 h-20 shadow-md shadow-black"
          style={{
            background: "linear-gradient(45deg, #FAD0C4, #FF9A9E, #FF6A88)",
          }}
        >
          <img
            src="https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
            className="text-xl font-bold h-20 w-20"
            alt="Logo"
          ></img>
          <ul className="flex flex-row gap-5">
            <li className="text-black hover:text-beige ">
              <Link to="https://www.facebook.com/lauravargas.cp/" target="_blank"><AiFillFacebook   className="h-10 w-10 cursor-pointer"/></Link>
            </li>
            <li className="text-black hover:text-beige ">
              <Link to="https://www.instagram.com/lauravargas.cpmu/" target="_blank"><AiFillInstagram className="h-10 w-10 cursor-pointer" /></Link>
            </li>
            <li>
              <Link to={TERMSANDPRIVACY} >Terms and privacy</Link>
            </li>
            <li className="flex items-center shadow-md shadow-black rounded-2xl border-1 border-black border-double bg-beige font-medium px-5 cursor-pointer hover:ring-1 hover:ring-black">
              <Link to={LOGIN}>Iniciar sesión</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        id="home"
        className="flex flex-col justify-center mt-1"
       style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover', // Ajusta según tus necesidades
          backgroundPosition: 'center', // Ajusta según tus necesidades
      }}
      >
        {/* <div className="container text-center">
          <h1 className="text-4xl font-bold">Laura Vargas Cejas y Pestañas </h1>
          <p className="mt-4">Inspirando confianza a través de la belleza</p>
        </div>
        <div className="mt-8">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/doqyrz0sg/image/upload/v1702401734/pihpuyqosz5mcwh2tvvt.png"
            alt="Imagen"
          />
        </div> */}
        <div>
          <h1 className="w-full mt-4 text-center text-4xl font-bold font-fontTitle">Laura Vargas</h1>
          <h5 className="text-center text-md font-fontSubTitle">Cejas y Pestañas</h5>
        </div>
        <div
            className="grid grid-cols-1 place-items-center gap-2 mt-10 sm:grid-cols-2 2xl:grid-cols-5 2xl:h-[calc(100vh-205px)]"
        >
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/orhzsq7kixbnw2dazxht.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
             <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">Ambientes profesionales y cuidados</span>
          </div>
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/a2ugvpzuvmjquvsyiwbk.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
          <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">Servicios personalizados</span>
          </div>
          <div className=" w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824197/Landing/cnqujn8oeh8x6jfac8ib.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
          <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">Eyelashes extensions</span>
          </div>
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824309/Landing/eetjnrejl6r30zhcy5md.jpg)] bg-cover bg-center flex flex-col items-center justify-end group">
          <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">Hydra Glow</span>
          </div>
          <div className="w-80 h-96 rounded-xl shadow-xl shadow-black bg-[url(https://res.cloudinary.com/doyafxwje/image/upload/v1702824196/Landing/izc72gdriptgh8cf4oft.jpg)] bg-cover bg-center flex flex-col items-center justify-end group sm:col-span-2 xl:col-auto">
          <span className="bg-black text-beige px-5 rounded-md mb-5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ">Microblading</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
