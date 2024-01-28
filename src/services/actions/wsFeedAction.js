export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS'; 
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE';

export const wsFeedConnectionStart = () => {
  return {
    type: WS_FEED_CONNECTION_START
  };
};
export const wsFeedConnectionSuccess = () => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
};

export const wsFeedConnectionError = () => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
};

export const wsFeedConnectionClosed = () => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  return {
    type: WS_FEED_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_FEED_SEND_MESSAGE,
    payload: message
  };
};