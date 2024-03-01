import { DELETE_INGREDIENT, CHANGE_ITEM_POSITION, ADD_BUN_INGREDIENT, ADD_MAIN_INGREDIENT } from "../constants";
import { TIngredients } from "../types/data";
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string
}

export interface IChangeItemPosition {
  readonly type: typeof CHANGE_ITEM_POSITION,
  readonly hoverIndex: number,
  readonly dragIndex: number
}

export interface IAddBunIngredientAction {
  readonly type: typeof ADD_BUN_INGREDIENT;
  readonly ingredient: TIngredients,
  readonly uniqueId: string
}
export interface IAddMainIngredientAction {
  readonly type: typeof ADD_MAIN_INGREDIENT;
  readonly ingredient: TIngredients,
  readonly uniqueId: string
}

export type TBurgerConstructorAction = 
  | IDeleteIngredientAction
  | IChangeItemPosition
  | IAddBunIngredientAction
  | IAddMainIngredientAction
  ;