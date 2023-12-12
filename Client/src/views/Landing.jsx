import { Link } from "react-router-dom";
import getParamsEnv from "../functions/getParamsEnv.js";
import React from 'react';

const { LOGIN } = getParamsEnv();

const Landing = () => {
  return (
    <div className="">
      <header
        className="bg-white text-white py-4 h-[130px]"
        style={{
          background:
            'linear-gradient(45deg, #FAD0C4, #FF9A9E, #FF6A88)',
        }}
      >
        <nav className="container flex items-center justify-between pr-5">
          <img
            src="https://res.cloudinary.com/doqyrz0sg/image/upload/v1702388420/aznyz3d12hy3wr3kk9j9.png"
            className="ml-5 text-xl font-bold ml-3 h-[100px] w-[100px]"
            alt="Logo"
          ></img>
          <ul className="flex">
            <li className="mx-4 text-black hover:text-secondaryPink ">
              <Link to="/login">Home</Link>
            </li>
            <li className="mx-4 text-black hover:text-secondaryPink ">
              <Link to="/login">Videos</Link>
            </li>
            <li className="mx-4 text-black hover:text-secondaryPink ">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section
        id="home"
        className="section py-16 flex flex-col items-center justify-center w-full h-[calc(100vh-130px)]"
        style={{
          backgroundImage:
            'url("https://www.wallpapershop.co.uk/images/holden-decor-iridescent-texture-star-girls-wallpaper-pink-p2978-22929_medium.jpg")',
          backgroundSize: 'cover', // Ajusta según tus necesidades
          backgroundPosition: 'center', // Ajusta según tus necesidades
        }}
      >
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Bienvenido al sitio Web</h1>
          <p className="mt-4">Inspirando confianza a través de la belleza</p>
        </div>
        <div className="mt-8">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/doqyrz0sg/image/upload/v1702401734/pihpuyqosz5mcwh2tvvt.png"
            alt="Imagen"
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;