import styles from "../pages/feed-info.module.css";

import React, { useEffect, FC } from "react";
import { useLocation } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getFeedOrderData } from "../services/actions/order-details";

import { useAppSelector, useAppDispatch } from "../components/hooks/hooks";

import { TIngredients } from "../services/types/data";
import { SET_ORDER_NUMBER, DELETE_ORDER_NUMBER } from "../services/constants";

export const FeedInfo: FC<{ modal: boolean }> = ({
  modal
}) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { number } = useParams();

  useEffect(()=>{
      dispatch({type: SET_ORDER_NUMBER, number });
      if (number) dispatch(getFeedOrderData(number));
    return () => {
      dispatch({type: DELETE_ORDER_NUMBER });
    }
  }, [])

  const orderData = useAppSelector(store => store.order.orderFeedData);

  const ingredients = useAppSelector((store) => store.ingredientsList.ingredients);
  const orderIngredients = orderData ? orderData.ingredients.map((id: string) => ingredients.find((item: { _id: string; }) => item._id === id)): [];
  
  if(orderData) {
    const today = new Date(orderData.updatedAt);
    const updatedIngredients: {ingredient: TIngredients, counter: number}[] = [];

    ingredients.forEach( (item: TIngredients) => {
      const counter = orderIngredients.filter((ingredient) => {
        if (ingredient) return ingredient._id === item._id
      }).length
      
      if (counter>0) {
        updatedIngredients.push({ ingredient: item, counter: counter });
      }
    });
    const orderPrice = orderIngredients.map((item) => {
      if (item) return item.price
    }).reduce((acc: number, current = 0) => acc + current, 0);

    return ( 
      <section className={styles.main} style={{ marginTop: !modal ? '120px' : ''}}>
        <div className={styles.container}>
          {!modal && <span className={"text text_type_digits-default " + styles.number}>
            #{number}
          </span>}
          <h2 className="text text_type_main-medium mb-3 mt-5">
          {orderData.name}
          </h2>
          <span className="text text_type_main-small" style={{ color: '#0CC', marginBottom: '60px'}}>Выполнен</span>
          <span className="text text_type_main-medium mb-6">Состав:</span>
          <div className={"custom-scroll " + styles.orders}>  
            <ul className={styles.list}>
              {updatedIngredients.map((item, index) => {
                return (
                  <li className={styles.item} key={index}>
                    <div className={styles.ingredient} ><img src={item.ingredient.image_mobile} className={styles.image}></img></div>
                    <p className={"text text_type_main-default " + styles.itemName}>{item.ingredient.name}</p>
                    <div className={styles.price}>
                      <span className="text text_type_digits-default">{item.ingredient.price}&nbsp;&#215;</span>
                      <span className="text text_type_digits-default">&nbsp;{item.counter}</span>
                      <CurrencyIcon type={"secondary"}/>
                    </div>
                  </li>
                )
              })
              }
            </ul>
          </div>
          <div className={styles.footer}>
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
            <div className={styles.total}>
              <span className="text text_type_digits-default">{orderPrice}&nbsp;</span><CurrencyIcon type={"secondary"}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
  else {
    return null
  }
}