import React from 'react';
import { useNavigate } from 'react-router-dom';

const TablaDatos = ({ data }) => {
    const navigate = useNavigate();
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
                    {data.map((fila, index) => (
                        <tr props={fila} key={index} onClick={() => navigate(`/detail/${fila.id}`)} className='text-xs hover:bg-gray-200 cursor-pointer'>
                            <td className="py-2 px-4 border">{fila.name}</td>
                            <td className="py-2 px-4 border">{fila.lastName}</td>
                            <td className="py-2 px-4 border">{fila.userName}</td>
                            <td className="py-2 px-4 border">{fila.Specialties.map((specialty) => specialty.specialtyName).join(', ')}</td>
                            <td className="py-2 px-4 border">{fila.role}</td>   
                            <td className="py-2 px-4 border">{fila.Branch.branchName}</td>
                            <td className="py-2 px-4 border">{fila.comission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaDatos;