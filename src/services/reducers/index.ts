import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { userAuthentificationReducer } from './user-data';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { wsFeedReducer } from './wsFeedReducer';
import { wsUserReducer } from './wsUserReducer';

import { store } from '../..';

// Корневой редьюсер
export const rootReducer = combineReducers({
  wsUser: wsUserReducer,
  wsFeed: wsFeedReducer,
  ingredientsList: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  ingredientsConstructor: constructorIngredientsReducer,
  order: orderDetailsReducer,
  user: userAuthentificationReducer
});


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof store.dispatch>