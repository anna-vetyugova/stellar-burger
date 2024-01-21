import styles from "../pages/orders-feed.module.css"
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// временная верстка для ПР ч.2
import bun from '../images/bun-01.png';
import core from '../images/core.png';
import sauce from '../images/sauce-03.png';
import meat from '../images/meat-03.png';
import salad from '../images/salad.png'

export function OrdersFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = true;

  const onChange = e => {
    e.preventDefault();
  }
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className={styles.main}>
      <div className={"custom-scroll " + styles.orders}>  
      {/* onScroll={handleScroll} */}
        <div className={styles.orderContainer} key="order#1" style={ { border: isActive ? '2px dashed #4C4CFF' : 'none' } }> 
          <div className={styles.orderData}>
            <span className="text text_type_digits-default">
              #034535
            </span>
            <span className="text text_type_main-small text_color_inactive">
              Сегодня, 16:20 i-GMT+3
            </span>
          </div>
          <h2 className="text text_type_main-medium">
            Death Star Starship Main бургер
          </h2>
          { location.pathname === '/profile/orders' && 
            <span className="text text_type_main-small">Создан</span>
          }
          <div className={styles.orderTotal}>
            <div className={styles.ingredientsContainer}>
              {/* временная верстка для ПР ч.2 */}
              <div className={styles.ingredient} ><img src={bun}></img></div>
              <div className={styles.ingredient} style={{ marginLeft: '48px', zIndex: 5}}><img src={sauce}></img></div>
              <div className={styles.ingredient} style={{ marginLeft: '96px', zIndex: 4}}><img src={core}></img></div>
              <div className={styles.ingredient} style={{ marginLeft: '144px', zIndex: 3}}><img src={meat}></img></div>
              <div className={styles.ingredient} style={{ marginLeft: '192px', zIndex: 2}}><img src={salad}></img></div>
              <div className={styles.ingredient + ' ' + styles.ingredient_last}  style={{ marginLeft: '240px', zIndex: 1}}>
                <img src={bun} style={{ opacity: 0.5}}></img>
                <span className={"text text_type_main-default " + styles.counter}>+3</span>
              </div>
            </div>
            <span className={"text text_type_digits-default " + styles.price}>0<CurrencyIcon/></span>
          </div>
        </div>
      </div>
    </section>
  )
}
