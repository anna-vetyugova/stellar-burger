// import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE, SET_ORDER_NUMBER, SET_ORDER_DATA, DELETE_ORDER_NUMBER } from "../actions/order-details";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE, SET_ORDER_NUMBER, SET_ORDER_DATA, DELETE_ORDER_NUMBER } from "../constants";

//объект созданного заказа
const initialState = {
  orderDetails : {
    number : '',
    total : 0
  },
  orderRequest: false,
  orderFailed: false,

  orderFeed : null,
  orderFeedData: null
}  

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
    case SET_ORDER_NUMBER: {
      return { 
        ...state, 
        orderFeed: action.number
      }
    }
    case SET_ORDER_DATA: {
      return { 
        ...state, 
        orderFeedData: action.order
      }
    }
    case DELETE_ORDER_NUMBER: {
      return { 
        ...state, 
        orderFeed : null,
        orderFeedData: null
      }
    }
    default: {
      return state;
    }
  }
};

