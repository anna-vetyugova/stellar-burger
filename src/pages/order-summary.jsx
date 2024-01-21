import styles from "../pages/order-summary.module.css"
import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrdersSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isActive = true;

  const onChange = e => {
    e.preventDefault();
  }
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className={styles.main}>

        <div className={styles.status}>
          <div className={styles.section}>
            <p className="text text_type_main-medium mb-6">Готовы</p>
            <div className={styles.section}>
              {/* <span className={"text text_type_digits-default mb-2 " + styles.orderNumber}>034533</span> */}
            </div>
          </div>
          <div className={styles.section}> 
            <p className="text text_type_main-medium mb-6">В работе</p>
            <div className={styles.section}>
              {/* <span className="text text_type_digits-default mb-2">034538</span> */}
            </div>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          {/* <span className={"text text_type_digits-large " + styles.number}>28 752</span> */}
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          {/* <span className={"text text_type_digits-large "  + styles.number}>138</span> */}
        </div>

    </section>
  )
}
