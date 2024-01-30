import styles from "../pages/order.module.css"
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";


export function Order(props) {
  const orderData = props.order;
  const location = useLocation();
  const today = new Date(orderData.createdAt);

  const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  const orderIngredients = orderData.ingredients.map((id) => ingredients.find(item => item._id === id));
  const orderPrice = orderIngredients.map(item => item.price).reduce((acc, current) => acc + current, 0);

  return (
    <section key={orderData._id} className={styles.orderMain} >
      <div className={styles.orderData}>
        <span className="text text_type_digits-default">
          {orderData.number}
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
        {orderData.name}
      </h2>
      { location.pathname === '/profile/orders' && 
        <span className="text text_type_main-small" style={{ color : orderData.status === 'done' ? '#00cccc' : ''}}>{ orderData.status === 'done' ? 'Выполнен' : orderData.status === 'created' ? 'Создан' : orderData.status === 'pending' ? 'Готовится' : ''}</span>
      }
      <div className={styles.orderTotal}>
        <div className={styles.ingredientsContainer}>
          {orderIngredients.map((ingregientItem, index, arr) => {

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
        <span className={"text text_type_digits-default " + styles.price}>{orderPrice}<CurrencyIcon/></span>
      </div>
    </section>
  )
}