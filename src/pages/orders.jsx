import styles from "../pages/orders.module.css"
import { OrdersFeed } from "./orders-feed";
import { OrdersSummary } from "./orders-summary";

export function Orders() {
  return (
    <main className={styles.content}>
      <h1 className={"text text_type_main-large mb-5 " + styles.header}>Лента заказов</h1>
      <div className={styles.container}>
        <OrdersFeed/> 
        <OrdersSummary/>
      </div>
    </main>
  );
}