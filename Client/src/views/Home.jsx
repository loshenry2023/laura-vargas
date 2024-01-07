// components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPayMethods } from '../redux/actions.js'
import Restricted from "./Restricted.jsx";
import ErrorToken from "./ErrorToken";


const Home = () => {
  const token = useSelector((state) => state?.token)
  const user = useSelector((state) => state?.user)
  const tokenError = useSelector((state) => state?.tokenError);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPayMethods({ token }))
  }, [tokenError]);

  if (tokenError === 401 || tokenError === 403) {
    return (
      <ErrorToken error={tokenError} />
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="flex flex-row">
          <SideBar />
          {user.role === "admin" || user.role === "superAdmin" ?
            <section className="mx-auto h-[calc(100vh-80px)] w-screen dark:bg-darkBackground">
              <h1 className="w-full text-xl text-center mt-10 dark:text-beige">Home</h1>
            </section> :
            <Restricted />
          }
        </div>
      </>
    );
  }
}


export default Home;
