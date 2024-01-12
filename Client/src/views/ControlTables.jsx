
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import ServicesTable from '../components/ServicesTable';
import PayMethodsTable from '../components/PayMethodsTable';
import BranchTable from '../components/BranchTable';
import SpecialtiesTable from '../components/SpecialtiesTable';
import ErrorToken from "../views/ErrorToken";
import { getBranches, getServices, getSpecialties } from '../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const ControlTables = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const clients = useSelector((state) => state?.clients);
  const count = useSelector((state) => state?.countClient);
  const token = useSelector((state) => state?.token)
  const tokenError = useSelector((state) => state?.tokenError);
  const methods = useSelector((state) => state?.payMethods)
  const branches = useSelector((state) => state?.branches)
  const dispatch = useDispatch()


  console.log(branches)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'clients':
        return <ServicesTable />;
      case 'PayMethods':
        return <PayMethodsTable methods={methods} />;
      case 'branches':
        return <BranchTable branches={branches} />;
      case 'specialties':
        return <SpecialtiesTable />;
      default:
        return null;
    }
  };

  if (tokenError === 401 || tokenError === 403) {
    return (
      <ErrorToken error={tokenError} />
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-row flex-grow dark:bg-darkBackground">
          <SideBar />
          <div className="flex flex-col w-full p-4 items-center mx-auto">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left">
                Control de tablas
              </h1>
            </div>
            <div className="flex gap-4">
              <button
                className={`px-4 mb-5 py-2 bg-gray-300 text-black rounded ${activeTab === 'clients' && 'bg-secondaryPink'
                  }`}
                onClick={() => setActiveTab('clients')}
              >
                Procedimientos
              </button>
              <button
                className={` mb-5 px-4 py-2 bg-gray-300 text-black rounded ${activeTab === 'PayMethods' && 'bg-secondaryPink'
                  }`}
                onClick={() => setActiveTab('PayMethods')}
              >
                Medios de Pago
              </button>
              <button
                className={` mb-5 px-4 py-2 bg-gray-300 text-black rounded ${activeTab === 'branches' && 'bg-secondaryPink'
                  }`}
                onClick={() => setActiveTab('branches')}
              >
                Sedes
              </button>
              <button
                className={` mb-5 px-4 py-2 bg-gray-300 text-black rounded ${activeTab === 'specialties' && 'bg-secondaryPink'
                  }`}
                onClick={() => setActiveTab('specialties')}
              >
                Especialiades
              </button>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    );
  }
};

export default ControlTables;
