// ! Obtiene user de bd.
const axios = require("axios");

// const { Genre } = require('../DB_connection');
// const { videogamesApiUrl, apiKey } = require('../functions/paramsEnv');
// const showLog = require("../functions/showLog");

//recibir usuario loggeado, token,    verificar que el usuario se encuentre cargado en caso de no existir error 400 , ----> registrar token en el usuario en la base de datos ----->  response datos de la tabla users con el rol de usuario

const getUser = () => {}; //async (req, res) => {
//     try {
//         showLog(`getGenres`);
//         response = await axios.get(`${videogamesApiUrl}/genres?key=${apiKey}`)
//         const dataRes = response.data.results;
//         const allGenres = dataRes.map(el => {
//             return {
//                 id: el.id,
//                 name: el.name,
//             };
//         });
//         // Obtenidos los datos de la API, los guardo en BD, sin pisar:
//         for (let dato of allGenres) {
//             await Genre.findOrCreate({
//                 where: { id: dato.id, name: dato.name },
//             })
//         }
//         const resp = await Genre.findAll();
//         showLog(`getGenres OK`);
//         res.status(200).json(resp);
//     } catch (err) {
//         showLog(`getGenres ERROR-> ${err.message}`);
//         return res.status(500).send(err.message);
//     }
// };
module.exports = getUser;
