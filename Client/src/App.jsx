// Vistas:
import Landing from "./views/Landing.jsx";
import Home from "./views/Home.jsx";
// Componentes:
import NavBar from "./components/NavBar.jsx";
// hooks, routers, reducers:
import { Route, Routes, useLocation } from "react-router-dom";
// Variables de entorno:
import getParamsEnv from "./functions/getParamsEnv.js";


const { ROOT, HOME } = getParamsEnv();

const App = () => {
  const location = useLocation()

  return (
    <div>
      {location.pathname !== "/" ?  <NavBar /> : null}
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={HOME} element={<Home />} />
        {/* <Route path={CREATE} element={<Create />} />
        <Route path={DETAIL} element={<Detail />} />
        <Route path={EDIT} element={<Edit />} />
        <Route path={ABOUT} element={<About />} />
        <Route path={ERROR} element={<Error />} />
        <Route path="*" element={<Error />} />  */}
      </Routes>
    </div>
  );
}

export default App;