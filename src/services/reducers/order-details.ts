// import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE, SET_ORDER_NUMBER, SET_ORDER_DATA, DELETE_ORDER_NUMBER } from "../actions/order-details";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,INCREASE_TOTAL_PRICE, DECREASE_TOTAL_PRICE, SET_ORDER_NUMBER, SET_ORDER_DATA, DELETE_ORDER_NUMBER } from "../constants";
import { TIngredients, TOrder } from "../types/data";
//объект созданного заказа
export type TorderDetailsinitialState = {
  orderDetails : {
    number : number,
    total : number
  },
  orderRequest: boolean,
  orderFailed: boolean,

  orderFeed : number,
  orderFeedData: TOrder | null
};

const orderDetailsinitialState: TorderDetailsinitialState = {
  orderDetails : {
    number : 0,
    total : 0
  },
  orderRequest: false,
  orderFailed: false,

  orderFeed : 0,
  orderFeedData: null
};


export const orderDetailsReducer = (state = orderDetailsinitialState, action: any): TorderDetailsinitialState => {
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
        orderFeed : 0,
        orderFeedData: null
      }
    }
    default: {
      return state;
    }
  }
};

