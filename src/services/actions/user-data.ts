import { api } from "../../utils/burger-api";
import { SET_AUTH_CHECKED, SET_USER } from "../constants";
import { AppThunk } from "../reducers";
export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean
}
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: {
    email?: string,
    name?: string,
    password?: string
  } | null;

}
export type TUserDataAction = 
  | ISetAuthCheckedAction
  | ISetUserAction
  ;


export const setAuthCheckedAction = (
  payload: boolean
): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload
});
export const setUserAction = (
  payload: { email: string, name: string } | null
): TUserDataAction => ({
  type: SET_USER,
  payload
});

export const setAuthChecked = (value: boolean): AppThunk => (dispatch) => { 
  dispatch(setAuthCheckedAction(value))
};

export const setUser = (user: { email: string; name: string; password: string } | null): AppThunk => (dispatch) => { 
  dispatch(setUserAction(user))
};

// export const getUser = (accessToken: string): AppThunk => async (dispatch) => {   
//   const res = await api.getUser(accessToken).then((res) => {
//     dispatch(setUser(res.user));
//   }); 
// };
export const getUser = (accessToken: string): AppThunk => async (dispatch) => { 
  await api.getUser(accessToken).then((res) => dispatch(setUser(res.user))).catch(res => console.error(res));
}

export const login = (form: { email: string, password: string}): AppThunk => async (dispatch) => {    
    const res  = await api.login(form).then((res) => {
      console.log(res);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      console.log(localStorage.getItem('accessToken'));
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
};

export const checkUserAuth = (accessToken: string | null): AppThunk => {
  return (dispatch) => {
    if (accessToken) {
      dispatch(getUser(accessToken))
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
          dispatch(setAuthChecked(true));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const registr = (form: any): AppThunk => async (dispatch) => { 
  const res = await api.registr(form).then((res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  });
}

export const logout = (token: string): AppThunk => async (dispatch) => { 
  await api.logout(token).then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUser(null));
    
  }).catch(res => console.error(res));
}

export const updateUserProfile = (form: { name: string; email: string; password: string; }, accessToken: string): AppThunk => async (dispatch) => { 
  await api.updateUserProfile(form, accessToken).then((res) => {
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  }).catch(res => console.error(res));
}
