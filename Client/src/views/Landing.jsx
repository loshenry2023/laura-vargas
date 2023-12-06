import React, { useState } from "react";

const Landing = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value)
    console.log(email)
  }

  const passHandler = (e) => {
    setPassword(e.target.value)
    console.log(email)
  }

  const logIn = (e) => {
    e.preventDefault()
  }

  return (
    <section className="bg-grey">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={logIn}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
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
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-black rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-black ">
                      Recuerdame
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-black hover:underline "
                >
                  Has olvidado la contraseña?
                </a>
              </div>
              <button
                className="w-full bg-secondaryPink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-black px-5 py-2.5 text-center"
              >
                Ingresar
              </button>
              <p className="text-sm font-light text-gray-500">
               No tienes una cuenta?{" "}
                <a
                  href="#"
                  className="text-sm font-medium text-black hover:underline"
                >
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
