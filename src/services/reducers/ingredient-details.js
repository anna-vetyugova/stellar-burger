
// import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../actions/ingredient-details";
import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../constants";

const itemIngredient = '';

export const ingredientDetailsReducer = (state = itemIngredient, action) => {
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