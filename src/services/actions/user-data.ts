import { api } from "../../utils/burger-api";
import { SET_AUTH_CHECKED, SET_USER } from "../constants";

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: any
}
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: any
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
// export const setAuthChecked = (value) => ({
//   type: SET_AUTH_CHECKED,
//   payload: value,
// });

export const setUser: any = (user: any) => (dispatch: any) => {
  dispatch(setUserAction(user))
};
// export const setUser = (user) => ({
//   type: SET_USER,
//   payload: user,
// });


export const getUser: any = () => (dispatch: any) => {
  return async (dispatch: any) => {
    const res = await api.getUser();
    console.log('123');
    dispatch(setUser(res.user));
  };
};
// export const getUser = () => {
//   return async (dispatch) => {
//     const res = await api.getUser();
//     dispatch(setUser(res.user));
//   };
// };

export const login: any = (form: any) => async (dispatch: any) => {
    const res = await api.login(form);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
};
// export const login = (form) => {
//   return async (dispatch) => {
//     const res = await api.login(form);
//     localStorage.setItem("accessToken", res.accessToken);
//     localStorage.setItem("refreshToken", res.refreshToken);
//     dispatch(setUser(res.user));
//     dispatch(setAuthChecked(true));
//   };
// };


export const checkUserAuth: any = () => (dispatch: any) => {
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
// export const checkUserAuth = () => {
//     return (dispatch) => {
//         if (localStorage.getItem("accessToken")) {
//             dispatch(getUser())
//               .catch(() => {
//                   localStorage.removeItem("accessToken");
//                   localStorage.removeItem("refreshToken");
//                   dispatch(setUser(null));
//                })
//               .finally(() => dispatch(setAuthChecked(true)));
//         } else {
//             dispatch(setAuthChecked(true));
//         }
//     };
// };


export const registr: any = (form: any) => async (dispatch: any) => {
  const res = await api.registr(form);
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  dispatch(setUser(res.user));
  dispatch(setAuthChecked(true));
}
// export const registr = (form) => {
//   return async (dispatch) => {
//     const res = await api.registr(form);
//     localStorage.setItem("accessToken", res.accessToken);
//     localStorage.setItem("refreshToken", res.refreshToken);
//     dispatch(setUser(res.user));
//     dispatch(setAuthChecked(true));
//   };
// };


export const logout: any = (form: any) => async (dispatch: any) => {
  await api.logout().then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setUser(null));
  }).catch(res => console.error(res));
}
// export const logout = () => {
//   return async (dispatch) => {
//     await api.logout().then(() => {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       dispatch(setUser(null));
//     }).catch(res => console.error(res));
//   }
// };


export const updateUserProfile: any = (form: any) => async (dispatch: any) => {
  await api.updateUserProfile(form).then((res) => {
    dispatch(setUser(res.user));
    dispatch(setAuthChecked(true));
  }).catch(res => console.error(res));
}
// export const updateUserProfile = (form) => {
//   return async (dispatch) => {
//     await api.updateUserProfile(form).then((res) => {
//       dispatch(setUser(res.user));
//       dispatch(setAuthChecked(true));
//     }).catch(res => console.error(res));
//   }
// };