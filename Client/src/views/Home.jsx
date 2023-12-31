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
        <section className="asd mx-auto h-[calc(100vh-80px)] w-screen dark:bg-darkBackground">
          <h1 className="w-full text-xl text-center mt-10 dark:text-beige">Home</h1>
        </section> : 
        (<div className="flex w-full justify-center items-center dark:bg-darkBackground">
        <img src="https://res.cloudinary.com/doyafxwje/image/upload/v1703981517/Access/denied_eylikh.png" alt="denied-access" className="h-96"/>
      </div>)
       }
      </div>
    </>
  );
};

export default Home;
