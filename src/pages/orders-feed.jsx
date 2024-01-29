import styles from "../pages/orders-feed.module.css";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet, useParams } from 'react-router-dom';
import { Order } from "./order";
import { wsFeedConnectionStart, wsFeedConnectionClosed } from "../services/actions/wsFeedAction";
import { wsUrl } from "../services/middleware";
import { wsUserConnectionStart, wsUserConnectionClosed } from "../services/actions/wsUserAction";
import { refreshToken } from "../utils/burger-api";

export function OrdersFeed() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { wsUserConnected, userMessages } = useSelector(store => ({
    wsUserConnected: store.wsUser.wsConnected,
    userMessages: store.wsUser.messages
  }));
  const { wsFeedConnected, feedMessages } = useSelector(store => ({
    wsFeedConnected: store.wsFeed.wsConnected,
    feedMessages: store.wsFeed.messages
  }));

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch(wsFeedConnectionStart(`${wsUrl}/orders/all`));
    }
    else if (location.pathname.includes('/profile')) {
      dispatch(wsUserConnectionStart((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`)));
    }
    return () => {
      if (location.pathname.includes('/feed')) {
        dispatch(wsFeedConnectionClosed());
      }
      else {
        dispatch(wsUserConnectionClosed());
      }
    }
  }, [location]);

  if( userMessages === 'Invalid or missing token') {
    dispatch(refreshToken);
    dispatch(wsUserConnectionStart((`${wsUrl}/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`)));
  }

  const actualOrders = wsUserConnected ? userMessages[userMessages.length-1] :  feedMessages[feedMessages.length-1];
  return ( 
    <section className={styles.main}>
      <div className={"custom-scroll " + styles.orders} style={{ width: wsFeedConnected ? "600px" : "844px" }}>
        <ul className={styles.list} style={{ marginRight: wsFeedConnected ? "8px" : "0" }}>
        {actualOrders && actualOrders.orders.map((order, index) => (
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
    </section>
  );
}
