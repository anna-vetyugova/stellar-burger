import styles from "../pages/profile-orders.module.css"
import { OrdersFeed } from "./orders-feed";


export function ProfileOrders() {
  return (
    <main className={styles.main}>
      <OrdersFeed /> 
    </main>
  );
}