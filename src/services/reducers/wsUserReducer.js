import { 
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE
} from "../actions/wsUserAction";
import { getCurrentTimestamp } from "../../utils/datetime";

const initialState = {
  wsConnected: false,
  messages: [],
      error: undefined
}; 

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
                error: undefined,
        wsConnected: true
      };

        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
                error: action.payload,
        wsConnected: false
      };

        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
                error: undefined,
        wsConnected: false
      };

        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
    case WS_USER_GET_MESSAGE:
      const timestamp = getCurrentTimestamp();
      return {
        ...state,
                error: undefined,
                messages: [...state.messages, { ...action.payload, timestamp: getCurrentTimestamp()} ],
      };
    default:
      return state;
  }
}; 