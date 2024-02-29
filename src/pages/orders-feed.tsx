import styles from "../pages/orders-feed.module.css";
import React, { useEffect, FC } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Order } from "./order";
import { wsFeedConnectionStart, wsFeedConnectionClosed, wsFeedConnectionStop } from "../services/actions/wsFeedAction";
import { wsUrl } from "../services/middleware";
import { wsUserConnectionStart, wsUserConnectionClosed, wsUserConnectionStop } from "../services/actions/wsUserAction";
import { refreshToken } from "../utils/burger-api";
import { TOrder } from "../services/types/data";
import { useAppSelector, useAppDispatch } from "../components/hooks/hooks";


export const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const wsFeed: { wsConnected: boolean, messages: [] } = useAppSelector(store => store.wsFeed);
  const wsUser: { wsConnected: boolean, messages: any} = useAppSelector(store => store.wsUser);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch(wsFeedConnectionStart(`${wsUrl}/orders/all`));
      console.log('wsFeed starts');

    }
    else if (accessToken && location.pathname.includes('/profile')) {
      dispatch(wsUserConnectionStart((`${wsUrl}/orders?token=${accessToken.replace('Bearer ', '')}`)));
      console.log('wsUser starts');
    }
    return () => {
      if (location.pathname.includes('/feed')) {
        dispatch(wsFeedConnectionStop());
        dispatch(wsFeedConnectionClosed());
        console.log('wsFeed closes');
      }
      else {
        dispatch(wsUserConnectionStop());
        dispatch(wsUserConnectionClosed());
        console.log('wsUser closes');
      }
    }
  }, [location]);

  if( accessToken && wsUser.messages === 'Invalid or missing token') {
    dispatch(refreshToken);
    dispatch(wsUserConnectionStart((`${wsUrl}/orders?token=${accessToken.replace('Bearer ', '')}`)));
  }

  const actualOrders = wsUser.wsConnected === true ? wsUser.messages[wsUser.messages.length-1] : wsFeed.messages[wsFeed.messages.length-1];

  return ( actualOrders && actualOrders.orders.length > 0 ?
    <section className={styles.main}>
      <div className={"custom-scroll " + styles.orders} style={{ width: wsFeed.wsConnected === true ? "600px" : "844px" }}>
        <ul className={styles.list} style={{ marginRight: wsFeed.wsConnected === true ? "8px" : "0" }}>
        {actualOrders && actualOrders.orders.map((order: TOrder, index: number) => (
          <li key={order.number} className={styles.orderItemContainer}>
            <Link
              key={index}
              className={styles.orderContainer}
              // style={{ border: isActive ? "2px dashed #4C4CFF" : "none" }}
              to={location.pathname.includes('/feed') ? `/feed/${order.number}` : `/profile/orders/${order.number}`}
              state={{ background: location }}>
              <Order order={order} />
            </Link>
          </li>
        ))}
        </ul>
      </div>
      <Outlet />
    </section> : null
  );
}