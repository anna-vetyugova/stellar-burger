import { getUserStatus, registerUser, loginUser } from "../../utils/burger-api";

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const SET_NEW_USER = 'SET_NEW_USER';
export const SET_NEW_USER_ERROR = 'SET_NEW_USER_ERROR';

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function getUserAuthStatus() {
  return function(dispatch) {
    getUserStatus().then(res => {
      console.log('asdf');
      if (res && res.success) {
        dispatch({
          type: GET_USER_DATA
        })
      } 
    })
    .catch(res => {
      dispatch({
        type: GET_USER_ERROR,
        error: res
      });
    })
  };
}
export function registerNewUser(userData) {
  return function(dispatch) {
    registerUser(userData).then(res => {
      if (res && res.success) {
        dispatch({
          type: SET_NEW_USER
        })
      } 
    })
    .catch(res => {
      dispatch({
        type: SET_NEW_USER_ERROR,
        error: res
      });
    })
  };
}
export function login(userData) {
  return function(dispatch) {
    console.log(userData);
    loginUser(userData).then(res => {
      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: SET_LOGIN_STATUS
        })
      } 
    })
    .catch(res => {
      dispatch({
        type: SET_LOGIN_ERROR,
        error: res
      });
    })
  }
}