import { getIngredients } from "../../utils/burger-api";

import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, TAB_SWITCH } from "../constants";

import { TIngredients } from "../types/data";

export interface ITabSwitchAction {
  readonly type: typeof TAB_SWITCH;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredients>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export const getIngredientsRequestAction = () : IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<TIngredients>
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

export const getIngredientsFailedAction = () : IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredientsList: any = () => (dispatch: any) => {  
  // return function(dispatch) {
  //   dispatch({
  //     type: GET_INGREDIENTS_REQUEST
  //   });
  dispatch(getIngredientsRequestAction());
  getIngredients().then(res => {
    if (res && res.success) {
      dispatch(getIngredientsSuccessAction(res.data));
      // dispatch({
      //   type: GET_INGREDIENTS_SUCCESS,
      //   ingredients: res.data
      // });
    } else {
      dispatch(getIngredientsFailedAction());
      // dispatch({
      //   type: GET_INGREDIENTS_FAILED
      // });
    }
  });
};

export type TBurgerIngredientsAction =
| ITabSwitchAction
| IGetIngredientsRequestAction
| IGetIngredientsSuccessAction
| IGetIngredientsFailedAction
;