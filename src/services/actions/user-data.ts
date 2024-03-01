import { api } from "../../utils/burger-api";
import { SET_AUTH_CHECKED, SET_USER } from "../constants";

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: any
}
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: string
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
  user: any
): TUserDataAction => ({
  type: SET_USER,
  user
});

export const setAuthChecked: any = (value: boolean) => (dispatch: any) => {
  dispatch(setAuthCheckedAction(value))
};

export const setUser: any = (user: any) => (dispatch: any) => {
  dispatch(setUserAction(user));
};

export const getUser: any = (accessToken: string) => async (dispatch: any) => {
  const res = await api.getUser(accessToken).then((res) => {
    dispatch(setUser(res.user));
  });
};

export const login: any = (form: { email: string, password: string}) => async (dispatch: any) => {
  console.log(form);
    const res  = await api.login(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
};

export const checkUserAuth: any = (accessToken: string) => (dispatch: any) => {
  if (accessToken) {
      dispatch(getUser(accessToken))
        .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            // dispatch(setUser(null));
          })
        .finally(() => dispatch(setAuthChecked(true)));
  } else {
      dispatch(setAuthChecked(true));
  }
};

export const registr: any = (form: any) => async (dispatch: any) => {
  const res = await api.registr(form).then((res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  });
}

export const logout: any = (token: string) => async (dispatch: any) => {
  await api.logout(token).then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUser(null));
    
  }).catch(res => console.error(res));
}

export const updateUserProfile: any = (form: string, accessToken: string) => async (dispatch: any) => {
  await api.updateUserProfile(form, accessToken).then((res) => {
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  }).catch(res => console.error(res));
}
