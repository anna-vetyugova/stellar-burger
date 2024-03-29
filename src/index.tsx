import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Корневой редьюсер, который обрабатывает экшены
import { rootReducer } from "./services/reducers";
import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";

import { socketMiddleware } from "./services/middleware";

import { 
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CONNECTION_STOP } from "./services/constants";

import {
   WS_USER_SEND_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_STOP } from "./services/constants";

 const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  wsClose: WS_FEED_CONNECTION_STOP,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};
const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  wsSendMessage: WS_USER_SEND_MESSAGE,
  wsClose: WS_USER_CONNECTION_STOP,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUserActions), socketMiddleware(wsFeedActions)));
export const store = createStore(rootReducer, enhancer);


ReactDOM.render(
    // Оборачиваем приложение компонентом Provider из пакета react-redux
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
