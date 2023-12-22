import React from 'react'

const HistoryServices = ({ history }) => {

  const transform = (fecha) => {
    const inputDate = new Date(fecha);

    const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric', 
    timeZoneName: 'short' 
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
    return formattedDate
}

  return (
    <section className='w-full mx-auto my-10 flex flex-col flex-wrap justify-evenly gap-10 md:flex-row'>
        <div className='border-4 border-double border-primaryPink flex flex-col gap-1 flex-wrap  p-4 h-fit rounded overflow-hidden shadow-lg'>
        {history.length >= 1 ? <h2 className='font-medium text-center'> Procedimientos anteriores </h2> : <h2 className='font-medium text-center'> Sin procedimientos registrados </h2>}
      {history.map((service, index) => {
        return (
          <div key={index} className='flex flex-row flex-wrap justify-between shadow-md border p-2'>
            <div className='flex flex-col justify-between'>
              <p> <span className="font-medium"> Fecha de procedimiento: </span> {transform(service.date)} </p>
              <p> <span className="font-medium">  Sede: </span> {service.branchName}</p>
              <p> <span className="font-medium">  Especialista: </span>  {service.attendedBy}</p>
              <p> <span className="font-medium">  Servicio: </span> {service.serviceName}</p>
            </div>
            <div className='flex flex-col justify-end pb-2'>
              <p className="cursor-pointer border shadow-md rounded-2xl my-1 w-40 px-5 bg-white hover:bg-blue-600 hover:text-white">           
                <a href={service.imageServiceDone} target="_blank">Ver fotos </a>
              </p>
              <p className="cursor-pointer border shadow-md rounded-2xl w-40 px-5 bg-white hover:bg-blue-600 hover:text-white">
                <a href={service.conformity} target="_blank">Ver conformidad </a>
              </p>
            </div>
           
            
          </div>
        );
      })}
      </div>
    </section>
  );
};

export default HistoryServices

