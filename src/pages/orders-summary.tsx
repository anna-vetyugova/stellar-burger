import styles from "../pages/orders-summary.module.css"
import React, { FC } from "react";
import { useAppSelector } from "../components/hooks/hooks";
import { TOrder } from "./order";

export const OrdersSummary: FC = () => {

  const wsFeed: { wsConnected: boolean, messages: any } = useAppSelector(store => store.wsFeed);
  const actualOrders = wsFeed.messages ? wsFeed.messages[wsFeed.messages.length-1]: null;

  const readyOrders = actualOrders && wsFeed.wsConnected === true ? actualOrders.orders.filter( (item: { status: string; }) => item.status === 'done').map((item: { number: number; }) => item.number): null;
  const ordersInProgress = actualOrders && wsFeed.wsConnected === true ? actualOrders.orders.filter( (item: { status: string; }) => item.status === 'pending').map((item: { number: number; }) => item.number): null;

  return (
    <section className={styles.main}>

        <div className={styles.status}>
          <div>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <div className={styles.section}>
              {readyOrders && readyOrders.length > 0 && readyOrders.map( (item: TOrder, index: number) => {
                return (<span className={"text text_type_digits-default mb-2 " + styles.orderNumber} key={index}>{item}</span>)
              })
              }
            </div>
          </div>
          <div className={styles.section}> 
            <p className="text text_type_main-medium mb-6">В работе</p>
            <div className={styles.section}>
            {ordersInProgress && ordersInProgress.length > 0 && ordersInProgress.map( (item: TOrder, index: number) => {
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
          <span className={"text text_type_digits-large " + styles.number}>{actualOrders && actualOrders.total}</span>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          <span className={"text text_type_digits-large "  + styles.number}>{actualOrders && actualOrders.totalToday}</span>
        </div>

    </section>
  )
}
