import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { userAuthentificationReducer } from './user-data';
// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredientsList: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  ingredientsConstructor: constructorIngredientsReducer,
  order: orderDetailsReducer,
  user: userAuthentificationReducer
});