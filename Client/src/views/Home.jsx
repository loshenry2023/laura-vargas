// components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <h1 className='w-full text-2xl text-center mt-10'>
          Hola {user.name}, tu rol es {user.role}
        </h1>
      </div>
    </>
  );  
};

export default Home;
