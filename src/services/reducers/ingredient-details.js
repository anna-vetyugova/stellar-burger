
import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../actions/ingredient-details";
import { initialState } from "../initialState";


export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_ITEM: {
      return { 
        ...state, 
        itemIngredient: action.ingredient
      };  
    }
    case DELETE_INGREDIENT_ITEM: {
      return { 
        ...state, 
        itemIngredient: ''
      };  
    }
    default: {
      return state;
    }
  }
};

