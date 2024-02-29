import styles from "../pages/order.module.css"
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../components/hooks/hooks";

import { TOrder, TIngredients } from "../services/types/data";

export const Order: FC<{ order: TOrder }> = ({ order }) => {

  const location = useLocation();
  const today = new Date(order.createdAt);

  const ingredientsList = useAppSelector((store) => store.ingredientsList.ingredients);

  const orderIngredients: any[] = order.ingredients.length > 0 ? order.ingredients.map((id) => ingredientsList.find((item: { _id: string; }) => item._id === id)) : [];

  const orderPrice: number = orderIngredients.length > 0 ? orderIngredients.map((item: { price: number; }) => item.price).reduce((acc: number, current: number) => acc + current, 0): 0;

  return ( orderIngredients.length > 0 ?
    <section key={order._id} className={styles.orderMain} >
      <div className={styles.order}>
        <span className="text text_type_digits-default">
          {order.number}
        </span>
        <span className="text text_type_main-small text_color_inactive">
          <FormattedDate
          date={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              today.getHours(),
              today.getMinutes() - 1,
              0,
            )
          }
          />&nbsp;i-GMT+3
        </span>
      </div>
      <h2 className="text text_type_main-medium">
        {order.name}
      </h2>
      { location.pathname === '/profile/orders' && 
        <span className="text text_type_main-small" style={{ color : order.status === 'done' ? '#00cccc' : ''}}>{ order.status === 'done' ? 'Выполнен' : order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : ''}</span>
      }
      <div className={styles.orderTotal}>
        <div className={styles.ingredientsContainer}>
          {orderIngredients.map((ingregientItem: { image_mobile: string | undefined; }, index: number, arr: string | any[]) => {

            if (index < 5) return (
              <div className={styles.ingredient} key={index} style={{ marginLeft: index === 0 ? 0 : 48*index + 'px', zIndex: arr.length-index}}>
                <img src={ingregientItem.image_mobile} className={styles.image}></img>
              </div>
            )

            else if (index === 5) return (
              <div className={styles.ingredient} key={index} style={{ marginLeft: '240px', zIndex: 1}}> 
                <img src={ingregientItem.image_mobile} className={styles.image}></img>
                {arr.length-1 > 5 && <span className={"text text_type_main-default " + styles.counter}>+{arr.length-1-index}</span>}
              </div>
            )

            else return null
            })
          }
        </div>
        <span className={"text text_type_digits-default " + styles.price}>{orderPrice}<CurrencyIcon type={"secondary"}/></span>
      </div>
    </section> : null
  )
}