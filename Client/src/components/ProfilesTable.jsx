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
            <table className=" border-collapse bg-white text-sm w-full dark:shadow-lg dark:shadow-black">
                <thead>
                    <tr className='border border-grey bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-grey' >
                        <th className="py-2 pr-4">Fecha de creación</th>
                        <th className="py-2 pr-4">Nombre</th>
                        <th className="py-2 pr-4">Apellido</th>
                        <th className="py-2 pr-4">Correo</th>
                        <th className="py-2 pr-4">Especialidad</th>
                        <th className="py-2 pr-4">Rol</th>
                        <th className="py-2 pr-4">Sede</th>
                        <th className="py-2 pr-4">Comisión</th>  
                    </tr>
                </thead>
                <tbody className='border border-grey dark:bg-darkBackground dark:text-darkText dark:hover:border-black'>
                    {users.map((fila, index) => (
                        <tr props={fila} key={index} onClick={() => navigate(`/detail/${fila.id}`)} className='text-xs hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black'>
                            <td className="py-2 pr-4 ">{fila.createdAt}</td>
                            <td className="py-2 pr-4 ">{fila.name}</td>
                            <td className="py-2 pr-4 ">{fila.lastName}</td>   
                            <td className="py-2 pr-4 ">{fila.userName}</td>
                            <td className="py-2 pr-4 ">{fila.Specialties.map((specialty) => specialty.specialtyName).join(', ')}</td>
                            <td className="py-2 pr-4 ">{fila.role}</td>   
                            <td className="py-2 pr-4">{fila.Branches.map((branch) => branch.branchName).join(', ')}</td>
                            <td className="py-2 pr-4">{fila.comission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>) : <h2 className="font-medium dark:text-darkText"> No hay coincidencias</h2>} </>
    );
};

export default TablaDatos;