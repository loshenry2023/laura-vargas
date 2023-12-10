import {GET_USER, GET_USERS, GET_USER_ID, GET_BRANCHES, GET_SPECIALTIES} from './actionsTypes';
import axios from 'axios'


export const getUser = (userData) => {
    return {
      type: GET_USER,
      payload: userData,
    };
  };

  export const getBranches = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get("http://localhost:3001/laura-vargas/branches");
        return dispatch({
          type: GET_BRANCHES,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    }
  };

  export const getSpecialties = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get("http://localhost:3001/laura-vargas/specialties");
        return dispatch({
          type: GET_SPECIALTIES,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    }
  };

  export const getUsers = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get("http://localhost:3001/laura-vargas/users");
        return dispatch({
          type: GET_USERS,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    }
  }

  export const getUserId = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/laura-vargas/userdata/${id}`);
        return dispatch({
          type: GET_USER_ID,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
