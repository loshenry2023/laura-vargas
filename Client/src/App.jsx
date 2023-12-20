// Vistas:
import Landing from "./views/Landing.jsx";
import LogIn from "./views/LogIn.jsx";
import Profiles from "./views/UserProfiles.jsx";
import Home from "./views/Home.jsx";
import Error from "./views/Error.jsx";
import TermsAndPrivacy from "./views/TermsAndPrivacy.jsx";
import UserDetail from "./views/UserDetail.jsx";
import Agenda from "./views/Agenda.jsx";

// hooks, routers, reducers:
import { Route, Routes } from "react-router-dom";

// Variables de entorno:
import getParamsEnv from "./functions/getParamsEnv.js";
import ClientDetail from "./views/ClientDetail.jsx";
import ClientsProfiles from "./views/ClientsProfiles.jsx";
import BranchSelection from "./views/BranchSelection.jsx";
const { ROOT, LOGIN, USERPROFILES, BRANCH, HOME, USERDETAIL, TERMSANDPRIVACY, AGENDA, CLIENTDETAIL, CLIENTSPROFILES } = getParamsEnv();

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={LOGIN} element={<LogIn />} />
        <Route path={BRANCH} element={<BranchSelection />} />
        <Route path={HOME} element={<Home />} />
        <Route path={USERPROFILES} element={<Profiles />} />
        <Route path={USERDETAIL} element={<UserDetail />} />
        <Route path={AGENDA} element={<Agenda />} />
        <Route path={CLIENTSPROFILES} element={<ClientsProfiles />} />
        <Route path={CLIENTDETAIL} element={<ClientDetail />} />
        <Route path={TERMSANDPRIVACY} element={<TermsAndPrivacy />} />
        {/* <Route path={DETAIL} element={<Detail />} />
        <Route path={EDIT} element={<Edit />} />
        <Route path={ABOUT} element={<About />} />
        <Route path={ERROR} element={<Error />} />*/}
        <Route path="*" element={<Error />} />   
      </Routes>
    </div>
  );
};

export default App;
