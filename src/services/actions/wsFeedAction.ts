import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_STOP,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "../constants";
import { TOrder } from "../types/data";

export interface IwsFeedConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  readonly payload: string;
}
export interface IwsFeedConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}
export interface IwsFeedConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  readonly payload: boolean
}
export interface IwsFeedConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}
export interface IwsFeedConnectionStopAction {
  readonly type: typeof WS_FEED_CONNECTION_STOP;
}
export interface IwsGetFeedMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: {
    orders: TOrder[],
    total: number,
    totalToday: number
  }
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

export const wsFeedConnectionSuccess = (): IwsFeedConnectionSuccessAction => ({
  type: WS_FEED_CONNECTION_SUCCESS,
});

export const wsFeedConnectionError = (payload: boolean): IwsFeedConnectionErrorAction => ({
  type: WS_FEED_CONNECTION_ERROR,
  payload
});

export const wsFeedConnectionClosed = (): IwsFeedConnectionClosedAction => ({
  type: WS_FEED_CONNECTION_CLOSED,
});

export const wsFeedConnectionStop = (): IwsFeedConnectionStopAction => ({
  type: WS_FEED_CONNECTION_STOP,
});

export const wsGetFeedMessage = (payload: {
  orders: TOrder[], total: number, totalToday: number
}): IwsGetFeedMessageAction => ({
  type: WS_FEED_GET_MESSAGE,
  payload
});

export const wsSendFeedMessage = (
  message: []
): IwsSendFeedMessageAction => ({
  type: WS_FEED_SEND_MESSAGE,
  message,
});
