import {  
          GET_USER_DATA,
          GET_USER_ERROR,
          SET_NEW_USER,
          SET_NEW_USER_ERROR,
          SET_LOGIN_STATUS,
          SET_LOGIN_ERROR
} from "../actions/user-data"  
const initialState = {
  userData: [],
  isAuthenticated: false,
  isAuthenticatedError: null,

  isRegistered : false,
  isRegistrationError: null,

  isLogin : false,
  isLoginError : null
}
export const userAuthentificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return { 
        ...state, 
        isAuthenticated: true, 
        // userData: action.userData, 
        isAuthenticatedError: null, 
      };
    }
    case GET_USER_ERROR: {
      return { 
        ...state, 
        isAuthenticated: false, 
        isAuthenticatedError: action.error 
        };
    }
    case SET_NEW_USER: {
      return { 
        ...state, 
        isRegistered: true
        };
    }
    case SET_NEW_USER_ERROR: {
      return { 
        ...state, 
        isRegistered: false, 
        isRegistrationError: action.error 
        };
    }
    case SET_LOGIN_STATUS: {
      return { 
        ...state, 
        isLogin: true
        };
    }
    case SET_LOGIN_ERROR: {
      return { 
        ...state, 
        isLogin: false, 
        isLoginError: action.error 
        };
    }
    default: {
      return state;
    }
  }
};