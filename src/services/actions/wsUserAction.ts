import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_STOP,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
} from "../constants";
import { TOrder } from "../types/data";
export interface IwsUserConnectionStartAction {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly payload: string;
}
export interface IwsUserConnectionSuccessAction {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IwsUserConnectionErrorAction {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly payload: boolean
}
export interface IwsUserConnectionClosedAction {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IwsUserConnectionStopAction {
  readonly type: typeof WS_USER_CONNECTION_STOP;
}
export interface IwsGetUserMessageAction {
  readonly type: typeof WS_USER_GET_MESSAGE;
  // readonly message: string[];
  payload: {
    orders: TOrder[],
    total: number,
    totalToday: number,
    messages: string[]
  }
}
export interface IwsSendUserMessageAction {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  readonly message: string;
}

export type TWsUserAction =
  | IwsUserConnectionStartAction
  | IwsUserConnectionSuccessAction
  | IwsUserConnectionErrorAction
  | IwsUserConnectionClosedAction
  | IwsUserConnectionStopAction
  | IwsGetUserMessageAction
  | IwsSendUserMessageAction;

export const wsUserConnectionStart = (
  payload: string
): IwsUserConnectionStartAction => ({
  type: WS_USER_CONNECTION_START,
  payload,
});

export const wsUserConnectionSuccess = (): IwsUserConnectionSuccessAction => ({
  type: WS_USER_CONNECTION_SUCCESS,
});
export const wsUserConnectionError = (payload: boolean): IwsUserConnectionErrorAction => ({
  type: WS_USER_CONNECTION_ERROR,
  payload
});
export const wsUserConnectionClosed = (): IwsUserConnectionClosedAction => ({
  type: WS_USER_CONNECTION_CLOSED,
});
export const wsUserConnectionStop = (): IwsUserConnectionStopAction => ({
  type: WS_USER_CONNECTION_STOP,
});
export const wsGetUserMessage = (payload: {
  orders: TOrder[],
  total: number,
  totalToday: number,
  messages: string[]
}): IwsGetUserMessageAction => ({
  type: WS_USER_GET_MESSAGE,
  payload
});
export const wsSendUserMessage = (message: string): IwsSendUserMessageAction => ({
  type: WS_USER_SEND_MESSAGE,
  message,
});