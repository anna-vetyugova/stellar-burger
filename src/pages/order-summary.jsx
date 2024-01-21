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
      <div>
        <div className={styles.status}>
          <div className={styles.section}>
            <p className="text text_type_main-medium">Готовы</p>
            <div className={styles.section}>
              <span>034533</span>
              <span>034532</span>
              <span>034530</span>
              <span>034527</span>
              <span>034527</span>
              <span>034525</span>
            </div>
          </div>
          <div className={styles.section}> 
            <p className="text text_type_main-medium">В работе</p>
            <div className={styles.section}>
              <span>034538</span>
              <span>034541</span>
              <span>034542</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <span>28 752</span>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за сегодня</p>
          <span>138</span>
        </div>
      </div>
    </section>
  )
}
