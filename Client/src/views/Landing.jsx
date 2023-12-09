// hooks, routers, reducers:
import { Link } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "../functions/getParamsEnv.js";
const {LOGIN} = getParamsEnv();


const Landing = () => {
  return <div>
    <Link to={LOGIN}> <button>Ir a Log In</button></Link>
  </div>;
};

export default Landing;
