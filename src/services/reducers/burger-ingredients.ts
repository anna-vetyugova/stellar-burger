import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TAB_SWITCH } from "../constants";

import { TIngredients } from "../types/data";

export type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredients>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsIsLoaded: boolean;
  currentTab: string;
};

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsIsLoaded: false,
  currentTab : 'bun-tab'
};


export const burgerIngredientsReducer = (state = ingredientsInitialState, action: any): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsIsLoaded: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false, ingredientsIsLoaded: true };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false, ingredientsIsLoaded: false };
    }
    case TAB_SWITCH: {
      return {...state, currentTab : action.newTab };
    }
    default: {
      return state;
    }
  }
};

