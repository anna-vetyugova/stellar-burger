import styles from "../pages/orders-feed.module.css";
import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { Order } from "./order";

export function OrdersFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = true;
  const onChange = (e) => {
    e.preventDefault();
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const order = 1;
  return (
    <section className={styles.main}>
      <div className={"custom-scroll " + styles.orders}>
        <ul className={styles.list}>
          <li key="1">
            <Link
            className={styles.orderContainer}
            style={{ border: isActive ? "2px dashed #4C4CFF" : "none" }}
            to={`/feed/${order}`}
            state={{ background: location }}
            >
              <Order order={1} />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
