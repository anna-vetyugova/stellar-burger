
import React from "react";
import styles from './order-details.module.css'
import doneIcon from '../../images/done.png'
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const { orderId } = useSelector(store => ({
    orderId : store.order.orderDetails.number
  }));
  return (
    <>
    <section className={styles.main}>
      <h3 className={"text text_type_digits-large " + styles.header}>{orderId}</h3>
      <span className={"text text_type_main-medium " + styles.caption}>идентификатор заказа</span>
      <img src={doneIcon} className={styles.image} alt="Иконка начала работы над заказом"></img>
      <p className={"text text_type_main-small " + styles.title}>Ваш заказ начали готовить</p>
      <p className={"text text_type_main-default text_color_inactive " + styles.subtitle}>Дождитесь готовности на орбитальной станции</p>
    </section>
    </>
  );
};
export default OrderDetails;