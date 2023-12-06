
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TAB_SWITCH } from "../actions/burger-ingredients";
import { initialState } from "../initialState";

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab : action.tab
      };
    }
    default: {
      return state;
    }
  }
};

