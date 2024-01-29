import styles from "../pages/profile.module.css"
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../services/actions/user-data";

export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderNumber = useSelector(store => store.order.orderFeed);
  console.log('orderNumber = ' +orderNumber);
 
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  }
  if (!orderNumber) {
  return (
    <section className={styles.main}>
      <div className={styles.navigation}>
        <div className={styles.navLinks}>
        <NavLink to={'/profile'} className={"text text_type_main-medium  " + styles.navLink}>
          <span className={location.pathname === '/profile' ? styles.active: styles.inactive}>Профиль</span>
        </NavLink>
          <NavLink to={'/profile/orders'} className={"text text_type_main-medium  " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585ad' })}>История заказов</NavLink>
          <NavLink to={'/'} onClick={logOut} className={"text text_type_main-medium  " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '#8585ad' })}>Выход</NavLink>
        </div>
        <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </section>
  );
  }
  else {
    return null
  }
}
