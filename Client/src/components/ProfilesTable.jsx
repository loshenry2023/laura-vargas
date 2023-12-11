import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TablaDatos = () => {
    const navigate = useNavigate();
    const users = useSelector((state) => state?.users);
    const count = useSelector((state) => state?.count);

    return (
        <>
        {count ? (<div className="rounded shadow w-full md:flex md:flex-col">
            <table className="border-collapse border bg-white text-sm w-full">
                <thead>
                    <tr>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Fecha de creación</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Nombre</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Apellido</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Correo</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Especialidad</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Rol</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Sede</th>
                        <th className="py-2 pr-4 bg-secondaryPink text-black text-left border">Comisión</th>  
                    </tr>
                </thead>
                <tbody>
                    {users.map((fila, index) => (
                        <tr props={fila} key={index} onClick={() => navigate(`/detail/${fila.id}`)} className='text-xs hover:bg-gray-200 cursor-pointer'>
                            <td className="py-2 pr-4 text-left border">{fila.createdAt}</td>
                            <td className="py-2 pr-4 text-left border">{fila.name}</td>
                            <td className="py-2 pr-4 text-left border">{fila.lastName}</td>   
                            <td className="py-2 pr-4 text-left border">{fila.userName}</td>
                            <td className="py-2 pr-4 text-left border">{fila.Specialties.map((specialty) => specialty.specialtyName).join(', ')}</td>
                            <td className="py-2 pr-4 text-left border">{fila.role}</td>   
                            <td className="py-2 pr-4 text-left border">{fila.Branch.branchName}</td>
                            <td className="py-2 pr-4 text-left border">{fila.comission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>) : <h2>No hay coincidencias</h2>} </>
    );
};

export default TablaDatos;