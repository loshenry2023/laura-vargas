// components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getPayMethods} from '../redux/actions.js'

const Home = () => {
  const token = useSelector((state) => state?.token)
  const user = useSelector((state) => state?.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPayMethods({token}))
  })

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar/>
        {user.role !== "especialista" ? 
        <section className="mx-auto h-[calc(100vh-80px)] w-screen dark:bg-darkBackground">
          <h1 className="w-full text-xl text-center mt-10 dark:text-beige">Home</h1>
        </section> : 
        (<div className="flex flex-col gap-10 w-full justify-center items-center dark:bg-darkBackground">
          <div>
          <h1 className="text-3xl tracking-wide text-center font-fontTitle  dark:text-darkText">Acceso restringido </h1>
          <h5 className="text-2xl tracking-wide text-center text-gray-700 dark:text-darkText">Lo sentimos pero no tienes acceso a esta página.</h5>
          </div>
        <img src="https://cdn-icons-png.flaticon.com/512/345/345535.png" alt="denied-access" className="h-96 dark:invert"/>
      </div>)
       }
      </div>
    </>
  );
};

export default Home;
