
// import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../actions/ingredient-details";
import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../constants";
import { TIngredients } from "../types/data";

// const itemIngredient = '';

export type TitemIngredientState = {
  itemIngredient: TIngredients | null
};

const itemIngredient: TitemIngredientState = {
  itemIngredient: null
};


export const ingredientDetailsReducer = (state = itemIngredient, action: any): TitemIngredientState => {
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