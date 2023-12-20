import React from 'react'

const HistoryServices = ({history}) => {

  return (
    <section className='grid grid-cols-4 gap-10 m-10'>
        {history.map(service => {
        return (
            <div className=' flex flex-col max-w-screen-sm p-4 h-fit rounded overflow-hidden shadow-lg'>
                <h4>{service.date}</h4>
                <div>
                    <p>{service.serviceName}</p>
                    <img src={service.imageServiceDone} className="w-20"/>
                </div>
                <p>Precio: {service.price}$</p>
                <p>Conformidad: <spa className="text-sm"> {service.conformity} </spa></p>
                <p>Sede: {service.branchName}</p>
                <p>Método de pago: {service.paymentMethodName}</p>
                <p>Especialista a cargo: {service.attededBy}</p>
            </div>
        )
    })}
    </section>
  )
}

export default HistoryServices