import React from 'react'

const HistoryCalendar = ({calendars}) => {

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
            {calendars.length >= 1 ? <h2 className='font-medium text-center text-xl dark:text-darkText'> Turnos anteriores </h2> : <h2 className='font-medium text-center'> Sin turnos registrados </h2>}
            {calendars.map((calendar, index) => {
                return (
                    <div key={index} className='flex flex-col justify-between shadow-sm shadow-black p-2'>
                        <p className='text-md tracking-wide font-light dark:text-darkText'> <span className='font-medium dark:text-darkText'>Fecha de turno: </span> {transform(calendar.date_from)} </p>
                        <p className='text-md tracking-wide font-light dark:text-darkText'> <span className='font-medium dark:text-darkText'>Observaciones: </span> {calendar.obs}  </p>
                    </div>
                );
            })}
            </div>
        </section>
      );
}

export default HistoryCalendar