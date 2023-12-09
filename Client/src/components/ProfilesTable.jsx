import React from 'react';

const TablaDatos = ({ datos }) => {
    return (
        <div className="mx-auto p-2 rounded shadow">
            <table className="border-collapse border bg-white text-sm">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Nombre</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Apellido</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Correo</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Especialidad</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Rol</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Sede</th>
                        <th className="py-2 px-4 bg-secondaryPink text-black border">Comisión</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((fila, index) => (
                        <tr key={index} className='text-xs'>
                            <td className="py-2 px-4 border">{fila.name}</td>
                            <td className="py-2 px-4 border">{fila.lastName}</td>
                            <td className="py-2 px-4 border">{fila.email}</td>
                            <td className="py-2 px-4 border">{fila.speciality}</td>
                            <td className="py-2 px-4 border">{fila.rol}</td>
                            <td className="py-2 px-4 border">{fila.branch}</td>
                            <td className="py-2 px-4 border">{fila.commission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaDatos;