import {GET_USER} from "./actionsTypes";

const initialState = {
  user: {},
  // dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
  // curPage: 1, // recuerdo el número de página para cuando regrese a la página
  // listoMostrar: false, // flag para que home refresque registros mostrando reloj
  // errors: '', // guardo los mensajes de error para mostrar en la pag.
  // pagPending: false, // aviso a home para que no se equivoque con la paginación
  // msgLoad: '', // indico en qué etapa de carga inicial está el programa
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
