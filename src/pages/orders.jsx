import styles from "../pages/orders.module.css"
import { OrderFeed } from "./order-feed";
import { OrdersSummary } from "./order-summary";

export function Orders() {
  return (
    <main className={styles.content}>
      <OrderFeed/> 
      <OrdersSummary/>
    </main>
  );
}