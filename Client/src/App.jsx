// Vistas:
import Landing from "./views/Landing.jsx";
import LogIn from "./views/LogIn.jsx";
import Profiles from "./views/UserProfiles.jsx";
import Home from "./views/Home.jsx";
// hooks, routers, reducers:
import { Route, Routes } from "react-router-dom";
// Variables de entorno:
import getParamsEnv from "./functions/getParamsEnv.js";
import UserDetail from "./views/UserDetail.jsx";
const { ROOT, LOGIN, USERPROFILES, HOME, USERDETAIL } = getParamsEnv();

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={LOGIN} element={<LogIn />} />
        <Route path={HOME} element={<Home />} />
        <Route path={USERPROFILES} element={<Profiles />} />
        <Route path={USERDETAIL} element={<UserDetail />} />
        {/* <Route path={DETAIL} element={<Detail />} />
        <Route path={EDIT} element={<Edit />} />
        <Route path={ABOUT} element={<About />} />
        <Route path={ERROR} element={<Error />} />
        <Route path="*" element={<Error />} />   */}
      </Routes>
    </div>
  );
};

export default App;
