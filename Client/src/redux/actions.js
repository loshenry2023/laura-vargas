import {
  GET_USER,
  GET_USERS,
  GET_USER_ID,
  GET_BRANCHES,
  GET_SPECIALTIES,
  DELETE_USER,
  SET_ICON,
  USER_LOGOUT,
  CLEAR_USERID
} from "./actionsTypes";
import axios from "axios";
import getParamsEnv from "../functions/getParamsEnv";
const {API_URL_BASE} = getParamsEnv()

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
        API_URL_BASE + "/branches", token
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
        API_URL_BASE + "/specialties", token
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
  const endPoint = API_URL_BASE + "/users?";
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
      `${API_URL_BASE}/userdetails/${id}`, token
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
        `${API_URL_BASE}/deleteuserdata/${id}`, {token}
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
        API_URL_BASE + "/logoutuser", {token}
      );
      return dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const clearUserId = () => (
  {type: CLEAR_USERID,
  payload: {}}
)

