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