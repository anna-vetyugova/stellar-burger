import styles from "../pages/feed-info.module.css";


import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { wsFeedConnectionStart } from "../services/actions/wsFeedAction";
import { wsFeedConnectionClosed } from "../services/actions/wsFeedAction";
import { wsUrl } from "../services/middleware";
import { getFeedOrderData, SET_ORDER_NUMBER, DELETE_ORDER_NUMBER } from "../services/actions/order-details";

// временная верстка для ПР ч.2
import bun from '../images/bun-01.png';
import core from '../images/core.png';
import sauce from '../images/sauce-03.png';
import meat from '../images/meat-03.png';
import salad from '../images/salad.png'

export function FeedInfo() {
  const location = useLocation();
  const { wsConnected, messages } = useSelector(store => store.wsFeed);
  const dispatch = useDispatch();
  const { number } = useParams();
  console.log(number);
  useEffect(()=>{
      dispatch({type: SET_ORDER_NUMBER, number });
      dispatch(getFeedOrderData(number));
    return () => {
      dispatch({type: DELETE_ORDER_NUMBER });
    }
  }, [])

  const orderData = useSelector(store => store.order.orderFeedData);
  const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  const orderIngredients = orderData ? orderData.ingredients.map((id) => ingredients.find(item => item._id === id)): null;
  
  if(orderData) {
    const today = new Date(orderData.updatedAt);
    const updatedIngredients = [];
    ingredients.forEach( item => {
      const counter = orderIngredients.filter( ingredient => ingredient._id === item._id).length;
      if (counter>0) {
        updatedIngredients.push({ ingredient: item, counter: counter });
      }
    });
    const orderPrice = orderIngredients.map(item => item.price).reduce((acc, current) => acc + current, 0);
    return ( 
      <section className={styles.main} >
        <div className={styles.container}>
          <span className={"text text_type_digits-default " + styles.number}>
          {orderData.number}
          </span>
          <h2 className="text text_type_main-medium mb-3">
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
                      <CurrencyIcon/>
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
              <span className="text text_type_digits-default">{orderPrice}&nbsp;</span><CurrencyIcon/>
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