import { SET_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from "../constants";
import { TIngredients } from "../types/data";

export interface ISetIngredientItemAction {
  readonly type: typeof SET_INGREDIENT_ITEM;
  readonly ingredient: TIngredients
}

export interface IDeleteIngredientItemAction {
  readonly type: typeof DELETE_INGREDIENT_ITEM;
}

export type TIngredientDetailsAction = 
  | ISetIngredientItemAction
  | IDeleteIngredientItemAction
  ;