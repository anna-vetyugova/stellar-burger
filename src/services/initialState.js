export const initialState = {
  
  bun: [],
  other: [],

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
    bun: null,
    ingredients:  []
  }, 
};