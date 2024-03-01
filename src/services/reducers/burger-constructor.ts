// import { DELETE_INGREDIENT, CHANGE_ITEM_POSITION } from "../actions/burger-constructor";
// import { DELETE_CONSTRUCTOR_ITEMS } from "../actions/order-details";

import { DELETE_INGREDIENT, CHANGE_ITEM_POSITION, ADD_BUN_INGREDIENT, ADD_MAIN_INGREDIENT } from "../constants";
import { DELETE_CONSTRUCTOR_ITEMS } from "../constants";
import { TIngredients } from "../types/data";
import { TBurgerConstructorAction } from "../actions/burger-constructor";
import { TOrderDetailsAction } from "../actions/order-details";

export type TcurrentIngredientsState = {
  bun: TIngredients | null,
  ingredients: { ingredient: TIngredients; key: string; }[]
};

const currentIngredients: TcurrentIngredientsState = {
  bun: null,
  ingredients: []
};

const addedIngredints: { ingredient: TIngredients; key: string; }[] = [];

export const constructorIngredientsReducer = (state = currentIngredients, action: TBurgerConstructorAction | TOrderDetailsAction): TcurrentIngredientsState  => {
  switch (action.type) {
    case ADD_BUN_INGREDIENT: {
      return { 
        ...state,
        bun: action.ingredient 
      }  
    }
    case ADD_MAIN_INGREDIENT: {
      const counter = state.ingredients.filter(item => item.ingredient._id === action.ingredient._id).length+1;
      action.ingredient.__v = counter;
      const newItem = { ingredient : action.ingredient, key: action.uniqueId };
      addedIngredints.push(newItem);
      return { 
        ...state,
        ingredients: addedIngredints
      }  
    }
    case DELETE_INGREDIENT: {
      const itemIndex = state.ingredients.reduce((_prev, item, index: number) => {
        if (item.ingredient._id === action.id) {
          return index   
        }
        else return 0
      }, 0 as number );
      state.ingredients.splice(itemIndex, 1);
      const counterItem = state.ingredients.filter(item => item.ingredient._id === action.id);
      const counter = counterItem.length > 0 ? counterItem[0].ingredient.__v-- : null;
      return { 
        ...state
      }  
    }
    case CHANGE_ITEM_POSITION: {
      const fromIndex = action.dragIndex;
      const toIndex = action.hoverIndex;

      const ingredients  = [...state.ingredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);

      return {
        ...state,
        ingredients: ingredients 
      };
    }
    case DELETE_CONSTRUCTOR_ITEMS: {
      return { 
        ...state,
        bun : null,
        ingredients : []
      }
    }
    default: {
      return state;
    }
  }
};

