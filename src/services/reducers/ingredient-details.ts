import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../constants";
import { TIngredients } from "../types/data";
import { TIngredientDetailsAction } from "../actions/ingredient-details";

export type TitemIngredientState = {
  itemIngredient: TIngredients | null
};

const itemIngredient: TitemIngredientState = {
  itemIngredient: null
};


export const ingredientDetailsReducer = (state = itemIngredient, action: TIngredientDetailsAction): TitemIngredientState => {
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
        itemIngredient: null
      };  
    }
    default: {
      return state;
    }
  }
};