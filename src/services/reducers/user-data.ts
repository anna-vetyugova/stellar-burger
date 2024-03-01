import { SET_AUTH_CHECKED, SET_USER } from "../constants";
import { TUserDataAction } from "../actions/user-data";

export type TuserDataInitialState = {
  email: any;
  name: any | string;
  user : {
    email?: string,
    name?: string | undefined,
    password?: string
  } | null,
  isAuthChecked: boolean
};

const userData: TuserDataInitialState = {
  user : null,
  isAuthChecked: false,
  email: '',
  name: ''
};


export const userAuthentificationReducer = (state = userData, action: TUserDataAction): TuserDataInitialState => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return { 
        ...state, 
        isAuthChecked: action.payload, 
      };
    }
    case SET_USER: {
      console.log(action);
      return { 
        ...state, 
        user: action.payload
      }
    }
    default: {
      return state;
    }
  }
};