export const wsUrl= `wss://norma.nomoreparties.space`;

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
      
      // console.log('type = ' + type);
      // console.log('wsInit = ' + wsInit);
      // console.log('payload = ' + payload);  
     
      if (type === wsInit) {
        socket = new WebSocket(payload); 
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsClose) {
          console.log('Stop WS connection');
          socket.close();
          socket = null;
        }

        if (type === wsSendMessage) {
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};