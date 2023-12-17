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
} from "./actionsTypes";

const initialState = {
  user: {},
  userID: {},
  users: [],
  count: 0,
  branches: [],
  specialties: [],
  error: null,
  selectedIcon: null,
};

const rootReducer = (state = initialState, { type, payload, count, error, idDelete }) => {
  switch (type) {
    case GET_USER:
      const getUserState = {
        ...state,
        user: payload,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUserState));
      return getUserState;

    case GET_USERS:
      const getUsersState = {
        ...state,
        users: payload,
        count: count,
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUsersState));
      return getUsersState;

    case GET_USER_ID:
      const getUserIDState = {
        ...state,
        userID: { ...payload },
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getUserIDState));
      return getUserIDState;
    case CLEAR_USERID:
      const clearUserId = {
        ...state,
        userID: payload
      }
      localStorage.setItem('myAppReduxState', JSON.stringify(clearUserId));
      return clearUserId;

    case DELETE_USER:
      const copy = state.users.filter(user => user.uid !== idDelete);
      const deleteUserState = {
        ...state,
        users: [...copy],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(deleteUserState));
      return deleteUserState;

    case GET_BRANCHES:
      const getBranchesState = {
        ...state,
        branches: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getBranchesState));
      return getBranchesState;

    case GET_SPECIALTIES:
      const getSpecialtiesState = {
        ...state,
        specialties: [...payload],
      };
      localStorage.setItem('myAppReduxState', JSON.stringify(getSpecialtiesState));
      return getSpecialtiesState;

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
      localStorage.removeItem('darkMode');
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;