import {GET_USER, ASD, ASDD} from './actionsTypes';


export const getUser = (userData) => {
    return {
      type: GET_USER,
      payload: userData,
    };
  };