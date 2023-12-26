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
        <div className='border-4 border-double border-primaryPink flex flex-col gap-1 flex-wrap  p-4 h-fit rounded overflow-hidden shadow-lg dark:border-zinc-800'>
      {history.length >= 1 ? <h2 className='font-medium text-center text-xl dark:text-darkText'> Procedimientos anteriores </h2> : <h2 className='font-medium text-center dark:text-darkText'> Sin procedimientos registrados </h2>}
      {history.map((service, index) => {
        return (
          <div key={index} className='flex flex-row flex-wrap justify-between shadow-sm shadow-black p-2 hover:bg-blue-300 dark:bg-darkPrimary dark:hover:bg-zinc-800'>
            <div className='flex flex-col justify-between'>
              <p className='text-md tracking-wide font-light dark:text-darkText'> <span className="font-medium dark:text-darkText">  Fecha de procedimiento: </span> {transform(service.date)} </p>
              <p className='text-md tracking-wide font-light dark:text-darkText'> <span className="font-medium dark:text-darkText">  Sede: </span> {service.branchName}</p>
              <p className='text-md tracking-wide font-light dark:text-darkText'> <span className="font-medium dark:text-darkText">  Especialista: </span>  {service.attendedBy}</p>
              <p className='text-md tracking-wide font-light dark:text-darkText'> <span className="font-medium dark:text-darkText">  Servicio: </span> {service.serviceName}</p>
            </div>
            <div className='flex flex-col justify-end pb-2 gap-2'>
              <p className="cursor-pointer shadow-md rounded-2xl w-40 px-5 bg-beige hover:bg-blue-600 hover:text-white dark:bg-darkBackground dark:text-darkText dark:hover:bg-blue-600 ">           
                <a href={service.imageServiceDone} target="_blank">Ver fotos </a>
              </p>
              <p className="cursor-pointer shadow-md rounded-2xl w-40 px-5 bg-beige hover:bg-blue-600 hover:text-white dark:bg-darkBackground dark:text-darkText dark:hover:bg-blue-600">
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

