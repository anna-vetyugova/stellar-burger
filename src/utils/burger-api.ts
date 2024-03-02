import { TIngredients, TOrder, TUser } from "../services/types/data";
const URL_API = 'https://norma.nomoreparties.space/api/';


export type TRequestOptions = {
  method: string;
  headers?: {
    'Content-Type': string;
    authorization?: string | undefined;
  };
  body?: string;
}

function checkResponse(res: Response) {
  return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const request = <T>(endpoint: string, options: TRequestOptions): Promise<T> => {
  return fetch(`${URL_API}${endpoint}`, options).then(res => checkResponse(res));
} 



type GetIngredients = {
  data: TIngredients[];
  success: boolean
}
export function getIngredients() {
  return request<GetIngredients>('ingredients', {
    method: 'GET'
  })
}

type GetOrderData = {
  orders: TOrder[]
  success: boolean
}
export function getOrderData(number: string) {
  return request<GetOrderData>(`orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

type RefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}
export const refreshToken = () => {
  return request<RefreshToken>('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async <T>(endpoint: string, options: TRequestOptions): Promise<T> => {
  try {
    const res = await fetch(`${URL_API}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      if (options.headers) {
        options.headers.authorization = refreshData.accessToken;
      } 
      const res = await fetch(`${URL_API}${endpoint}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


type GetOrderNumber = {
  order: {
    number: number
  };
  success: boolean
}
export const getOrderNumber = async (ingredients: TIngredients[], accessToken: string) => {
  return fetchWithRefresh<GetOrderNumber>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      ingredients: ingredients
    })
  })
}


type GetUser = {
  user: TUser;
  success: boolean
}
const getUser = async () => {
  return fetchWithRefresh<GetUser>('auth/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'authorization': String(localStorage.getItem('accessToken'))
  }
  })
}


type Login = {
  user: TUser;
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
export function login(form: { email: string, password: string}) {
  return request<Login>(`auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
}


type Registr = {
  user: TUser;
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
export function registr(form: string) {
  return request<Registr>(`auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
}


type ForgetPassword = {
  success: boolean;
  accessToken: string | null | undefined;
}
export function forgetPassword(form: { email: string }, accessToken: string) {
  return request<ForgetPassword>(`password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify(form)
  })
}


type ResetPassword = {
  success: boolean;
}
export function resetPassword(form: { password: string, token: string }) {
  return request<ResetPassword>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
}

type Logout = {
  success: boolean;
  token: string
}
export function logout(token: string) {
  return request<Logout>('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'token': token,
    })
  })
}

// обновление пароля через сброс
type UpdateUserProfile = {
  accessToken: string;
  success: boolean;
  user: TUser
}
const updateUserProfile = async (form: TUser | null, accessToken: string) => {
  return fetchWithRefresh<UpdateUserProfile>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify(form)
  })
}

export const api = {
  getUser,
  login,
  logout,
  registr,
  resetPassword,
  forgetPassword,
  updateUserProfile
};
