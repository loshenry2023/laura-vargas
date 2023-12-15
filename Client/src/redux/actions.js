import {
  GET_USER,
  GET_USERS,
  GET_USER_ID,
  GET_BRANCHES,
  GET_SPECIALTIES,
  ERROR,
  DELETE_USER,
  SET_ICON,
  USER_LOGOUT
} from "./actionsTypes";
import axios from "axios";

export const getUser = (userData) => {
  return {
    type: GET_USER,
    payload: userData,
  };
};

export const getBranches = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/laura-vargas/branches", token
      );
      return dispatch({
        type: GET_BRANCHES,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getSpecialties = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/laura-vargas/specialties", token
      );
      return dispatch({
        type: GET_SPECIALTIES,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getUsers = (
  nameOrLastName,
  attribute,
  order,
  page,
  size,
  branch,
  specialty,
  role,
  createDateEnd,
  createDateStart,
  token
) => {
  const endPoint = "http://localhost:3001/laura-vargas/users?";
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        `${endPoint}nameOrLastName=${nameOrLastName}&attribute=${attribute}&order=${order}&page=${page}&size=${size}&branch=${branch}&specialty=${specialty}&role=${role}&createDateEnd=${createDateEnd}&createDateStart=${createDateStart}`, token
      );

      console.log("RESP: ", data);

      const modifiedData = data.rows.map((user) => {
        const { createdAt, ...rest } = user;
        const createdAtInBogotaTimezone = new Date(createdAt).toLocaleString(
          "en-US",
          {
            timeZone: "America/Bogota",
          }
        );
        return { ...rest, createdAt: createdAtInBogotaTimezone };
      });

      return dispatch({
        type: GET_USERS,
        payload: modifiedData,
        count: data.count,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getUserId = (id, token) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/laura-vargas/userdetails/${id}`, token
      );
      return dispatch({
        type: GET_USER_ID,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}

export const deleteUser = (id, token) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/laura-vargas/deleteuserdata/${id}`, {token}
      );
      return dispatch({
        type: DELETE_USER,
        payload: response.data,
        idDelete: id,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const setIcon = (iconName) => ({
  type: SET_ICON,
  payload: iconName,
});

export const setLogout = (token) => {

  console.log(token, "action")
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/laura-vargas/logoutuser", {token}
      );
      return dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};