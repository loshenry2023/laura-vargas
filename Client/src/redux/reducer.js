import {
  GET_USER,
  GET_USERS,
  GET_USER_ID,
  GET_BRANCHES,
  GET_SPECIALTIES,
  ERROR,
  DELETE_USER,
} from "./actionsTypes";

const initialState = {
  user: {},
  userID: {},
  users: [],
  count: 0,
  branches: [],
  specialties: [],
  error: null,
  // dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
  // curPage: 1, // recuerdo el número de página para cuando regrese a la página
  // listoMostrar: false, // flag para que home refresque registros mostrando reloj
  // errors: '', // guardo los mensajes de error para mostrar en la pag.
  // pagPending: false, // aviso a home para que no se equivoque con la paginación
  // msgLoad: '', // indico en qué etapa de carga inicial está el programa
};

const rootReducer = (state = initialState, { type, payload, count, error, idDelete}) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: payload,
        count: count,
      };

    case GET_USER_ID:
      return {
        ...state,
        userID: { ...payload },
      };

      case DELETE_USER:
        let copy = users.filter(user => user.uid !== idDelete)
        return {
          ...state,
          users: [...copy],
        };

    case GET_BRANCHES:
      return {
        ...state,
        branches: [...payload],
      };

    case GET_SPECIALTIES:
      return {
        ...state,
        specialties: [...payload],
      };

    case ERROR:
      return {
        ...state,
        users: payload,
        count: count,
        error: error,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
