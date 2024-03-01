import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { userAuthentificationReducer } from './user-data';

import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { wsFeedReducer } from './wsFeedReducer';
import { wsUserReducer } from './wsUserReducer';

import { store } from '../..';

import { TBurgerConstructorAction } from '../actions/burger-constructor';
import { TBurgerIngredientsAction } from '../actions/burger-ingredients';
import { TOrderDetailsAction } from '../actions/order-details';
import { TUserDataAction } from '../actions/user-data';
import { TWsFeedAction } from '../actions/wsFeedAction';
import { TWsUserAction } from '../actions/wsUserAction';
import { TIngredientDetailsAction } from '../actions/ingredient-details';

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

type TAppActions =
| TBurgerConstructorAction
| TBurgerIngredientsAction
| TOrderDetailsAction
| TUserDataAction
| TIngredientDetailsAction
| TWsFeedAction
| TWsUserAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>;


export type RootState = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch<TReturnType = void> = (action: TAppActions | AppThunk<TReturnType>) => TReturnType;

