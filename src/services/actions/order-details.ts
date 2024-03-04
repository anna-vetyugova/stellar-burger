import { getOrderNumber, getOrderData } from "../../utils/burger-api";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE, DELETE_CONSTRUCTOR_ITEMS, SET_ORDER_NUMBER, SET_ORDER_DATA, DELETE_ORDER_NUMBER } from "../constants";
import { TIngredients, TOrder } from "../types/data";
import { AppThunk } from "../reducers";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number?: number
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
  readonly number?: number
}


export interface IIncreaseTotalPriceAction {
  readonly type: typeof INCREASE_TOTAL_PRICE;
  readonly total: number
}
export interface IDecreaseTotalPriceAction {
  readonly type: typeof DECREASE_TOTAL_PRICE;
  readonly item: string;
  readonly orderDetails?: {
    total: number 
  }
}


export interface IDeleteConstructorItemsAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEMS;
}

export interface ISetOrderNumberAction {
  readonly type: typeof SET_ORDER_NUMBER;
  readonly number?: string
}
export interface ISetOrderDataAction {
  readonly type: typeof SET_ORDER_DATA;
  readonly order: TOrder
}
export interface IDeletedOrderNumberAction {
  readonly type: typeof DELETE_ORDER_NUMBER;
}

export const getOrderFailedtAction = () : IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED

});
export const getOrderSuccessAction = (
  number: number
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  number
});
export const getOrderRequestAction = () : IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST
});
export const deleteConstructorItemsAction = () : IDeleteConstructorItemsAction => ({
  type: DELETE_CONSTRUCTOR_ITEMS
})

export const setOrderDataAction = (
    order: TOrder
  ): ISetOrderDataAction => ({
    type: SET_ORDER_DATA,
    order
  });



export const getNumber = (ingredients: string[], accessToken: string): AppThunk => (dispatch) => { 
  dispatch(getOrderRequestAction());
  getOrderNumber(ingredients, accessToken).then(res => {
    if (res && res.success) {
      dispatch(getOrderSuccessAction(res.order.number));
      dispatch(deleteConstructorItemsAction());
    } else {
      dispatch(getOrderFailedtAction());
    }
  });
};
 
export const getFeedOrderData = (number: string): AppThunk => (dispatch) => {  
  dispatch(getOrderRequestAction());
  getOrderData(number).then(res => {
    if (res && res.success) {
      dispatch(setOrderDataAction(res.orders[0]));
    } else {
      dispatch(getOrderFailedtAction());
    }
  });
};

export type TOrderDetailsAction = 
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IIncreaseTotalPriceAction
  | IDecreaseTotalPriceAction
  | IDeleteConstructorItemsAction
  | ISetOrderNumberAction
  | ISetOrderDataAction
  | IDeletedOrderNumberAction
  ;