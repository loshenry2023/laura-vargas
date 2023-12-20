import React from 'react'

const HistoryServices = ({ history }) => {

  return (
    <section className='w-full my-10 flex flex-col flex-wrap justify-evenly gap-10 md:flex-row'>
      {history.map((service, index) => {
        return (
          <div key={index} className='border-4 border-double border-primaryPink flex flex-col gap-1 flex-wrap w-80 mx-auto p-4 h-fit rounded overflow-hidden shadow-lg'>
            <h4 className='text-center font-medium'>{service.date}</h4>
            <p className="text-center">Sede: {service.branchName}</p>
            <p className="text-center">Especialista a cargo: {service.attendedBy}</p>
            <p className="text-center">Servicio: {service.serviceName}</p>
            <p className="mx-auto cursor-pointer border border-black rounded-2xl w-fit my-1 px-5 bg-beige"           
            onClick={() => handleToggleFotos(index)}>
               <a href={service.imageServiceDone} target="_blank">Ver fotos</a>
            </p>
            <p className="mx-auto cursor-pointer border border-black rounded-2xl w-fit px-5 bg-beige"           
            onClick={() => handleToggleFotos(index)}>
              <a href={service.conformity} target="_blank">Ver conformidad</a>
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default HistoryServices








  // const [fotosStates, setFotosStates] = useState(history.map(() => false));
  // const handleToggleFotos = (index) => {
  //   const newFotosStates = [...fotosStates];
  //   newFotosStates[index] = !newFotosStates[index];
  //   setFotosStates(newFotosStates);
  // };

  // const [conformidad, setConformidad] = useState(history.map(() => false));
  // const handleToggleConformidad = (index) => {
  //   const newConformidad = [...conformidad];
  //   newConformidad[index] = !newConformidad[index];
  //   setConformidad(newConformidad);
  // };







            //  {fotosStates[index] ? (
            //   <div className= "my-2 border rounded-2xl p-2 flex flex-col items-center">
            //     <p>Servicio aplicado: {service.serviceName}</p>
            //     <img src={service.imageServiceDone} className="w-20" alt="Service Done"/>
            //   </div>) : null }
              
              
            //   <p className="mx-auto cursor-pointer border border-black rounded-2xl w-fit px-5 bg-beige" onClick={() => handleToggleConformidad(index)}>Ver conformidad</p>
            //   {conformidad[index] ? (
            //   <div className='w-full my-2 border rounded-2xl p-2 flex flex-col items-center'>
            //       <p className="max-w-full text-center"> Conformidad: <span> {service.conformity} </span></p>
            //   </div>) : null}
             