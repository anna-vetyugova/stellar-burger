
import { GET_CONSTRUCTOR_INGREDIENTS } from "../actions/burger-constructor";
import { initialState } from "../initialState";

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: action.currentIngredients
      };
    }
    default: {
      return state;
    }
  }
};

