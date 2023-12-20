// components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const Home = () => {

  return (
    <>
      <NavBar />
      <div className="flex flex-row">
        <SideBar />
        <section className="asd mx-auto h-[calc(100vh-80px)] w-screen dark:bg-darkBackground">
          <h1 className="w-full text-xl text-center mt-10 dark:text-beige">Home</h1>
        </section>
      </div>
    </>
  );
};

export default Home;
