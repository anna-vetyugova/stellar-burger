import styles from "../pages/profile-orders.module.css"
import { OrdersFeed } from "./orders-feed";
import React, { FC } from "react";

export const ProfileOrders: FC = () => {
  return (
    <main className={styles.main}>
      <OrdersFeed /> 
    </main>
  );
}