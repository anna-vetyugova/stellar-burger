import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_STOP,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
} from "../constants";

export interface IwsUserConnectionStartAction {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly payload: string;
}
export interface IwsUserConnectionSuccessAction {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IwsUserConnectionErrorAction {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}
export interface IwsUserConnectionClosedAction {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IwsUserConnectionStopAction {
  readonly type: typeof WS_USER_CONNECTION_STOP;
}
export interface IwsGetUserMessageAction {
  readonly type: typeof WS_USER_GET_MESSAGE;
  readonly message: string;
}
export interface IwsSendUserMessageAction {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  readonly message: string;
}

export type TWsFeedAction =
  | IwsUserConnectionStartAction
  | IwsUserConnectionSuccessAction
  | IwsUserConnectionErrorAction
  | IwsUserConnectionClosedAction
  | IwsUserConnectionStopAction
  | IwsGetUserMessageAction
  | IwsSendUserMessageAction;


// export const wsUserConnectionStart = (url) => {
//   return {
//     type: WS_USER_CONNECTION_START,
//     payload: url,
//   };
// };
export const wsUserConnectionStart = (
  payload: string
): IwsUserConnectionStartAction => ({
  type: WS_USER_CONNECTION_START,
  payload,
});

// export const wsUserConnectionSuccess = () => {
//   return {
//     type: WS_USER_CONNECTION_SUCCESS,
//   };
// };
export const wsUserConnectionSuccess = (): IwsUserConnectionSuccessAction => ({
  type: WS_USER_CONNECTION_SUCCESS,
});

// export const wsUserConnectionError = () => {
//   return {
//     type: WS_USER_CONNECTION_ERROR,
//   };
// };
export const wsUserConnectionError = (): IwsUserConnectionErrorAction => ({
  type: WS_USER_CONNECTION_ERROR,
});

// export const wsUserConnectionClosed = () => {
//   return {
//     type: WS_USER_CONNECTION_CLOSED,
//   };
// };
export const wsUserConnectionClosed = (): IwsUserConnectionClosedAction => ({
  type: WS_USER_CONNECTION_CLOSED,
});


// export const wsUserConnectionStop = () => {
//   return {
//     type: WS_USER_CONNECTION_STOP,
//   };
// };
export const wsUserConnectionStop = (): IwsUserConnectionStopAction => ({
  type: WS_USER_CONNECTION_STOP,
});


// export const wsGetUserMessage = (message) => {
//   return {
//     type: WS_USER_GET_MESSAGE,
//     payload: message,
//   };
// };
export const wsGetUserMessage = (message: string): IwsGetUserMessageAction => ({
  type: WS_USER_GET_MESSAGE,
  message,
});


// export const wsSendUserMessage = (message) => {
//   return {
//     type: WS_USER_SEND_MESSAGE,
//     payload: message,
//   };
// };
export const wsSendUserMessage = (message: string): IwsSendUserMessageAction => ({
  type: WS_USER_SEND_MESSAGE,
  message,
});