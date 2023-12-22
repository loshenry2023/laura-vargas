//Hooks, reducer
import React from 'react'
import { useNavigate } from 'react-router-dom';

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv";
const { CLIENTDETAILBASE } = getParamsEnv();

const ClientsTable = ({clients}) => {
    const navigate = useNavigate();

      return (
        <>
          {clients ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="border border-black w-full text-sm text-left rtl:text-right text-black dark:text-beige dark:border-beige">
                <thead className="bg-secondaryPink text-black text-left dark:bg-darkPrimary dark:text-darkText dark:border-gre">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Apellido
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Correo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ID Personal
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Teléfono 1
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Teléfono 2
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Fecha de creación
                    </th>
                  </tr>
                </thead>
                <tbody>
                {clients.map((fila, index) => (
                   <tr
                   props={fila}
                   key={index}
                   onClick={() => navigate(`${CLIENTDETAILBASE}/${fila.id}`)}
                   className="text-xs hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-200 dark:hover:text-black"
                 >
                    <td className="px-4 py-4">{fila.name}</td>
                    <td className="px-4 py-4">{fila.lastName}</td>
                    <td className="px-4 py-4">{fila.email}</td>
                    <td className="px-4 py-4">{fila.id_pers}</td>
                    <td className="px-4 py-4">{fila.phoneNumber1}</td>
                    <td className="px-4 py-4">{fila.phoneNumber2}</td>
                    <td className="px-4 py-4">{fila.createdAt}</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="font-medium dark:text-darkText">
              {" "}
              No hay coincidencias
            </h2>
          )}{" "}
        </>
      );
}


export default ClientsTable