
import { GET_ORDER_NUMBER, UPDATE_ORDER_NUMBER } from "../actions/order-details";
import { initialState } from "../initialState";


export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return { ...state,  itemOrder: action.itemOrder.orderId };  
    }
    default: {
      return state;
    }
  }
};

