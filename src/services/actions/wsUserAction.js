export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS'; 
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';
export const WS_USER_SEND_MESSAGE = 'WS_USER_SEND_MESSAGE';

export const wsUserConnectionStart = (url) => {
  return {
    type: WS_USER_CONNECTION_START,
    payload: url
  };
};
export const wsUserConnectionSuccess = () => {
  return {
    type: WS_USER_CONNECTION_SUCCESS
  };
};

export const wsUserConnectionError = () => {
  return {
    type: WS_USER_CONNECTION_ERROR
  };
};

export const wsUserConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED
  };
};

export const wsGetUserMessage = message => {
  return {
    type: WS_USER_GET_MESSAGE,
    payload: message
  };
};

export const wsSendUserMessage = message => {
  
  return {
    type: WS_USER_SEND_MESSAGE,
    payload: message
  };
};