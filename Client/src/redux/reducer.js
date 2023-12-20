import {
  GET_USER,
  GET_USERS,
  GET_USER_ID,
  GET_BRANCHES,
  GET_SPECIALTIES,
  ERROR,
  DELETE_USER,
  SET_ICON,
  USER_LOGOUT,
  CLEAR_USERID,
  GET_SERVICES,
  TOKEN,
  GET_CLIENTS,
  GET_CLIENT_ID,
  CLEAR_CLIENT_ID,
} from "./actionsTypes";

const initialState = {
  token: "",
  user: {},
  userID: {},
  users: [],
  count: 0,
  branches: [],
  specialties: [],
  services: [],
  clients: [],
  clientID: {},
  error: null,
  selectedIcon: null,
};

const rootReducer = (state = initialState, { type, payload, count, error, idDelete }) => {
  switch (type) {

        //! Trae token
        case TOKEN:
          const getToken = {
            ...state,
            token: payload,
          };
          localStorage.setItem('myAppReduxState', JSON.stringify(getToken));
          return getToken;
    

    //! Trae usuario de logIn
    case GET_USER:
      const getUserState = {
        ...state,
        user: payload,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUserState));
      return getUserState;

    //! Trae todos los usuarios
    case GET_USERS:
      const getUsersState = {
        ...state,
        users: payload,
        count: count,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUsersState));
      return getUsersState;

    //! Trae usuario por ID
    case GET_USER_ID:
      const getUserIDState = {
        ...state,
        userID: { ...payload },
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUserIDState));
      return getUserIDState;

    //! Borra detail de estado global
    case CLEAR_USERID:
      const clearUserId = {
        ...state,
        userID: payload
      }
      localStorage.setItem('myAppReduxState', JSON.stringify(clearUserId));
      return clearUserId;

    //! Borra usuario
    case DELETE_USER:
      const copy = state.users.filter(user => user.uid !== idDelete);
      const deleteUserState = {
        ...state,
        users: [...copy],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(deleteUserState));
      return deleteUserState;

    //! Trae las sedes
    case GET_BRANCHES:
      const getBranchesState = {
        ...state,
        branches: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getBranchesState));
      return getBranchesState;

    //! Trae las especialidades
    case GET_SPECIALTIES:
      const getSpecialtiesState = {
        ...state,
        specialties: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getSpecialtiesState));
      return getSpecialtiesState;

    //! Trae los clientes
    case GET_CLIENTS:
      const getClients = {
        ...state,
        clients: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getClients));
      return getClients;

    //! Trae cliente por ID
    case GET_CLIENT_ID:
      const getClientId = {
        ...state,
        clientID: { ...payload },
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getClientId));
      return getClientId;

    //! Borra cliente detail de estado global
    case CLEAR_CLIENT_ID:
      const clearClientId = {
        ...state,
        clientID: payload
      }
      localStorage.setItem('myAppReduxState', JSON.stringify(clearClientId));
      return clearClientId;

    //! Trae los procedimientos
    case GET_SERVICES:
      const getServices = {
        ...state,
        services: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getServices));
      return getServices;

    case ERROR:
      const errorState = {
        ...state,
        users: payload,
        count: count,
        error: error,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(errorState));
      return errorState;
      
    case SET_ICON:
      const setIconState = {
        ...state,
        selectedIcon: payload,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(setIconState));
      return setIconState;

    case USER_LOGOUT:
      localStorage.removeItem('myAppReduxState');
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;