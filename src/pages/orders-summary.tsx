import styles from "../pages/orders-summary.module.css"
import React, { FC } from "react";
import { useAppSelector } from "../components/hooks/hooks";
import { TIngredients, TOrder } from "../services/types/data";

export const OrdersSummary: FC = () => {

  const { wsFeedConnected, orders, total, totalToday } = useAppSelector(store => ({
    wsFeedConnected: store.wsFeed.wsConnected,
    orders: store.wsFeed.orders,
    total: store.wsFeed.total,
    totalToday: store.wsFeed.totalToday
  }));
  const actualOrders = orders.length > 0 ? orders : null;
  const readyOrders = actualOrders && wsFeedConnected === true ? actualOrders.filter(item => item.status === 'done').map(item => item.number): null;
  const ordersInProgress = actualOrders && wsFeedConnected === true ? actualOrders.filter(item => item.status === 'pending').map(item => item.number): null;

  return (
    <section className={styles.main}>
        <div className={styles.status}>
          <div>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <div className={styles.section}>
              {readyOrders && readyOrders.map( (item, index) => {
                return (<span className={"text text_type_digits-default mb-2 " + styles.orderNumber} key={index}>{item}</span>)
              })
              }
            </div>
          </div>
          <div className={styles.section}> 
            <p className="text text_type_main-medium mb-6">В работе</p>
            <div className={styles.section}>
            {ordersInProgress && ordersInProgress.map( (item, index) => {
                if(index < 10) {
                  return ( <span className="text text_type_digits-default mb-2" key={index}>{item}</span>)
                }
              })
              }
            </div>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <span className={"text text_type_digits-large " + styles.number}>{total}</span>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          <span className={"text text_type_digits-large "  + styles.number}>{totalToday}</span>
        </div>

    </section>
  )
}
