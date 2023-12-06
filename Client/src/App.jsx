// Vistas:
import Landing from "./views/Landing.jsx";
import Home from "./views/Home.jsx";
// hooks, routers, reducers:
import { Route, Routes} from "react-router-dom";
// Variables de entorno:
import getParamsEnv from "./functions/getParamsEnv.js";


const { ROOT, HOME } = getParamsEnv();

const App = () => {

  return (
    <div>
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