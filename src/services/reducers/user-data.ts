import { SET_AUTH_CHECKED, SET_USER } from "../constants";

export type TuserDataInitialState = {
  user : {
    email: string, 
    name: string
  },
  isAuthChecked: boolean
};

const userData: TuserDataInitialState = {
  user : {
    email: '',
    name: ''
  },
  isAuthChecked: false
};


export const userAuthentificationReducer = (state = userData, action: any): TuserDataInitialState => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return { 
        ...state, 
        isAuthChecked: action.payload, 
      };
    }
    case SET_USER: {
      return { 
        ...state, 
        user: action.user 
      };
    }
    default: {
      return state;
    }
  }
};