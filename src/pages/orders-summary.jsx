import styles from "../pages/orders-summary.module.css"
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

export function OrdersSummary() {
  const { wsConnected, messages } = useSelector(store => store.wsFeed);
  const actualOrders = messages ? messages[messages.length-1]: null;

  const readyOrders = actualOrders && wsConnected ? actualOrders.orders.filter( item => item.status === 'done').map(item => item.number): null;
  const ordersInProgress = actualOrders && wsConnected ? actualOrders.orders.filter( item => item.status === 'pending').map(item => item.number): null;

  return (
    <section className={styles.main}>

        <div className={styles.status}>
          <div>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <div className={styles.section}>
              {readyOrders && readyOrders.length > 0 && readyOrders.map( (item, index) => {
                return (<span className={"text text_type_digits-default mb-2 " + styles.orderNumber} key={index}>{item}</span>)
              })
              }
            </div>
          </div>
          <div className={styles.section}> 
            <p className="text text_type_main-medium mb-6">В работе</p>
            <div className={styles.section}>
            {ordersInProgress && ordersInProgress.length > 0 && ordersInProgress.map( (item, index) => {
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
