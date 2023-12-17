import React from 'react'
import { useNavigate } from 'react-router-dom';

//variables de entorno
import getParamsEnv from "../functions/getParamsEnv";
const { ROOT } = getParamsEnv();

const Error = () => {
    const navigate = useNavigate();

    function handleOriginData() {
        navigate(ROOT);
    }

    return (
        <div>
            <h1 >GAME OVER</h1>
            {/* <img  src={imgShow} alt="" /> */}
            <h2 >Pagina no encontrada</h2>
            <p  href="/">
            <button  onClick={() => handleOriginData()} >Restart</button>
            </p>
        </div >
    )
}

export default Error
