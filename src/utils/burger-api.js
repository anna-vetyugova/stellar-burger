const URL_API = 'https://norma.nomoreparties.space/api/';

function checkResponse(res) {
  return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
function request(endpoint, options) {
  return fetch(`${URL_API}${endpoint}`, options).then(checkResponse);
}
export function getIngredients() {
  return request('ingredients')
}

export function getOrderNumber(ingredients) {
  return request('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ingredients: ingredients
    })
  })
}

// const checkReponse = (res) => {
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };
export const refreshToken = () => {
  request('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${URL_API}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${URL_API}${endpoint}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// export const resetPassword () => {

// }

export const getUserStatus = async () => fetchWithRefresh('auth/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("accessToken")
  }
});
export const registerUser = (userData) => request('auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': userData.email,
    'password': userData.password,
    'name': userData.name,
  })
});
export const loginUser = (userData) => request('auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'email': userData.email,
    'password': userData.password,
  })
});