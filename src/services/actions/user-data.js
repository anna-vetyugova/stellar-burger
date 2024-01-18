import { api } from "../../utils/burger-api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return async (dispatch) => {
    const res = await api.getUser();
    dispatch(setUser(res.user));
  };
};

export const login = () => {
  return async (dispatch) => {
    const res = await api.login();
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser(null));
               })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};
export const registr = (form) => {
  return async (dispatch) => {
    const res = await api.registr(form);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  };
};

export const logout = () => {
  return async (dispatch) => {
    await api.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUser(null));
  };
};
