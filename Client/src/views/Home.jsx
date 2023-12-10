// components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const Home = () => {


  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <h1 className='w-full text-2xl text-center mt-10'>
          HOME
        </h1>
      </div>
    </>
  );  
};

export default Home;
