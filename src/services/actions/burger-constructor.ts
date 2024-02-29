import { DELETE_INGREDIENT, CHANGE_ITEM_POSITION } from "../constants";

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
}

export interface IChangeItemPosition {
  readonly type: typeof CHANGE_ITEM_POSITION;
}

export type TBurgerConstructorAction = 
  | IDeleteIngredientAction
  | IChangeItemPosition
  ;