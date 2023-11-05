import React from "react";
import OrderItem from "./order-item/order-item";
import orderListStyles from "./order-list.module.css";

const OrderList = ({ ingredient }) => {
  return (
    <section className={"custom-scroll " + orderListStyles.main}>
      <ul className={orderListStyles.list}>
        {ingredient.map((item) => (
          <OrderItem ingredient={item} key={item._id} />
        ))}
      </ul>
    </section>
  );
};
export default OrderList;