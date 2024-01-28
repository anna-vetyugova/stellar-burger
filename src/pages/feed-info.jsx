import styles from "../pages/feed-info.module.css";


import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

// временная верстка для ПР ч.2
import bun from '../images/bun-01.png';
import core from '../images/core.png';
import sauce from '../images/sauce-03.png';
import meat from '../images/meat-03.png';
import salad from '../images/salad.png'

export function FeedInfo() {
  const location = useLocation();
  const { order } = useParams();
  const today = new Date();
  
  return (
    <section className={styles.main} >
      <div className={styles.container}>
        <span className={"text text_type_digits-default " + styles.number}>
          #034535
        </span>
        <h2 className="text text_type_main-medium mb-3">
          Death Star Starship Main бургер
        </h2>
        <span className="text text_type_main-small" style={{ color: '#0CC', marginBottom: '60px'}}>Выполнен</span>
        <span className="text text_type_main-medium mb-6">Состав:</span>
        <div className={"custom-scroll " + styles.orders}>  
          <ul className={styles.list}>
            <li className={styles.item}>
              <div className={styles.ingredient} ><img src={bun}></img></div>
              <p className={"text text_type_main-default " + styles.itemName}>Флюоресцентная булка R2-D3</p>
              <div className={styles.price}>
                <span className="text text_type_digits-default">2&nbsp;&#215;</span>
                <span className="text text_type_digits-default">&nbsp;20</span>
                <CurrencyIcon/>
              </div>
            </li>
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
            <span className="text text_type_digits-default">510&nbsp;</span><CurrencyIcon/>
          </div>
        </div>
      </div>
    </section>
  );
}