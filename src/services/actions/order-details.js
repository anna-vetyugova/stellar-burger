import { getOrderNumber, getOrderData } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_SUCCESS';

export const INCREASE_TOTAL_PRICE = 'INCREASE_TOTAL_PRICE';
export const DECREASE_TOTAL_PRICE = 'DECREASE_TOTAL_PRICE';

export const DELETE_CONSTRUCTOR_ITEMS = 'DELETE_ORDER_NUMBER';

export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';


export function getNumber(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderNumber(ingredients).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: res.order.number
        })
        dispatch({
          type: DELETE_CONSTRUCTOR_ITEMS
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    });
  };
}
export function getFeedOrderData(number) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderData(number).then(res => {
      if (res && res.success) {
        dispatch({
          type: SET_ORDER_DATA,
          order: res.orders[0]
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    });
  };
}
