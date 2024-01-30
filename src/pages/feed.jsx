import styles from "../pages/feed.module.css"
import { OrdersFeed } from "./orders-feed";
import { OrdersSummary } from "./orders-summary";
import { useSelector } from "react-redux";

export function Feed() {
const orderNumber = useSelector(store => store.order.orderFeed);

// if (orderNumber) return null

  return (
    <main className={styles.content}>
      <h1 className={"text text_type_main-large mb-5 " + styles.header}>Лента заказов</h1>
      <div className={styles.container}>
        <OrdersFeed /> 
        <OrdersSummary/>
      </div>
    </main>
    );
}