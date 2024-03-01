import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_STOP,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "../constants";


export interface IwsFeedConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  readonly payload: string;
}
export interface IwsFeedConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}
export interface IwsFeedConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}
export interface IwsFeedConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}
export interface IwsFeedConnectionStopAction {
  readonly type: typeof WS_FEED_CONNECTION_STOP;
}
export interface IwsGetFeedMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly message: [];
}
export interface IwsSendFeedMessageAction {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  readonly message: [];
}

export type TWsFeedAction =
  | IwsFeedConnectionStartAction
  | IwsFeedConnectionSuccessAction
  | IwsFeedConnectionErrorAction
  | IwsFeedConnectionClosedAction
  | IwsFeedConnectionStopAction
  | IwsGetFeedMessageAction
  | IwsSendFeedMessageAction;

export const wsFeedConnectionStart = (
  payload: string
): IwsFeedConnectionStartAction => ({
  type: WS_FEED_CONNECTION_START,
  payload,
});
// export const wsFeedConnectionStart = (url) => {
//   return {
//     type: WS_FEED_CONNECTION_START,
//     payload: url
//   };
// };

// export const wsFeedConnectionSuccess = () => {
//   return {
//     type: WS_FEED_CONNECTION_SUCCESS
//   };
// };
export const wsFeedConnectionSuccess = (): IwsFeedConnectionSuccessAction => ({
  type: WS_FEED_CONNECTION_SUCCESS,
});

// export const wsFeedConnectionError = () => {
//   return {
//     type: WS_FEED_CONNECTION_ERROR
//   };
// };
export const wsFeedConnectionError = (): IwsFeedConnectionErrorAction => ({
  type: WS_FEED_CONNECTION_ERROR,
});

// export const wsFeedConnectionClosed = () => {
//   return {
//     type: WS_FEED_CONNECTION_CLOSED
//   };
// };
export const wsFeedConnectionClosed = (): IwsFeedConnectionClosedAction => ({
  type: WS_FEED_CONNECTION_CLOSED,
});

// export const wsFeedConnectionStop = () => {
//   return {
//     type: WS_FEED_CONNECTION_STOP
//   };
// };
export const wsFeedConnectionStop = (): IwsFeedConnectionStopAction => ({
  type: WS_FEED_CONNECTION_STOP,
});

// export const wsGetFeedMessage = message => {
//   return {
//     type: WS_FEED_GET_MESSAGE,
//     payload: message
//   };
// };
export const wsGetFeedMessage = (message: []): IwsGetFeedMessageAction => ({
  type: WS_FEED_GET_MESSAGE,
  message,
});

// export const wsSendFeedMessage = message => {
//   return {
//     type: WS_FEED_SEND_MESSAGE,
//     payload: message
//   };
// };
export const wsSendFeedMessage = (
  message: []
): IwsSendFeedMessageAction => ({
  type: WS_FEED_SEND_MESSAGE,
  message,
});
