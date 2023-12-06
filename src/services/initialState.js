export const initialState = {
  // список всех полученных ингредиентов
  ingredients : [], 
  ingredientsRequest: false,
  ingredientsFailed: false,

  itemIngredient : '', //объект текущего просматриваемого ингредиента

  currentTab : 'bun-tab',

  //объект созданного заказа
  itemOrder : {
    orderId : '666666'
  }, 

  //список всех ингредиентов в текущем конструкторе бургера
  currentIngredients : {
    bun: {
          "_id":"60666c42cc7b410027a1a9b1",
          "name":"Краторная булка N-200i",
          "type":"bun",
          "proteins":80,
          "fat":24,
          "carbohydrates":53,
          "calories":420,
          "price":1255,
          "image":"https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v":0
    },
    ingredients:  [{
          "_id":"60666c42cc7b410027a1a9b5",
          "name":"Говяжий метеорит (отбивная)",
          "type":"main",
          "proteins":800,
          "fat":800,
          "carbohydrates":300,
          "calories":2674,
          "price":3000,
          "image":"https://code.s3.yandex.net/react/code/meat-04.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
          "__v":0
        },
        {
          "_id":"60666c42cc7b410027a1a9ba",
          "name":"Соус с шипами Антарианского плоскоходца",
          "type":"sauce",
          "proteins":101,
          "fat":99,
          "carbohydrates":100,
          "calories":100,
          "price":88,
          "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
          "__v":0
        }
    ]
  }, 
};