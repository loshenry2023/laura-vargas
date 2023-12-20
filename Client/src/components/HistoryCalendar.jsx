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
        <section className='w-full mx-auto  my-10 flex flex-col flex-wrap justify-evenly gap-10 md:flex-row'>
            <div className='border-4 border-double border-primaryPink flex flex-col gap-1 flex-wrap  p-4 h-fit rounded overflow-hidden shadow-lg'>
            <h2> Turnos </h2>
            {calendars.map((calendar, index) => {
                return (
                    <div key={index} className='flex flex-col justify-between shadow-md border p-2'>
                        <p> <span className='font-medium'>Fecha de turno: </span> {transform(calendar.date_from)} </p>
                        <p> <span className='font-medium'>Observaciones: </span> {calendar.obs}  </p>
                    </div>
                );
            })}
            </div>
        </section>
      );
}

export default HistoryCalendar