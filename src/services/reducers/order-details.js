
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED ,INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE } from "../actions/order-details";
import { initialState } from "../initialState";

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return { 
        ...state, 
        orderFailed: false, 
        orderDetails: {
          ...state.orderDetails,
          number: action.number
        }, 
        orderRequest: false 
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case INCREASE_TOTAL_PRICE: {
      return { 
        ...state,  
        orderDetails : {
          ...state.orderDetails,
          total: state.orderDetails.total+action.total 
        }
      }
    }
    case DECREASE_TOTAL_PRICE: {
      return { 
        ...state, 
        orderDetails : {
          ...state.orderDetails,
          total: state.orderDetails.total-action.item 
        }
      }
    }
    default: {
      return state;
    }
  }
};

