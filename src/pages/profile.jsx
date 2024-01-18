import styles from "../pages/profile.module.css"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../services/actions/user-data";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((store) => store.user.user);
  
  const [isActive, setActive] = useState(false);
  const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setActive(true);
  }
  const onSubmit = (e) => {
    e.preventDefault();
  }
  const onClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  }
  console.log(localStorage.getItem("refreshToken"));
  return (
    <section className={styles.main}>
      
      <div className={styles.navigation}>
        <div className={styles.navLinks}>
          <NavLink to={`/profile`} className={"text text_type_main-medium " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>Профиль</NavLink>
          <NavLink to={`/profile/orders`} className={"text text_type_main-medium text_color_inactive " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>История заказов</NavLink>
          <NavLink to={`/`} onClick={onClick} className={"text text_type_main-medium text_color_inactive " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>Выход</NavLink>
        </div>
        <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      
      <div className={styles.inputs}>
        <EmailInput
          onChange={onChange}
          value={form.name}
          name={'name'}
          placeholder="Имя"
          isIcon={false}
          extraClass="mb-2"
          aria-required={true}
          isIcon={true}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="Логин"
          isIcon={false}
          extraClass="mb-2"
          aria-required={true}
          isIcon={true}
        />
        <EmailInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          placeholder="Пароль"
          isIcon={false}
          extraClass="mb-2"
          aria-required={true}
          isIcon={true}
        />
        { isActive && 
        <div>
          <Button htmlType="button" type="secondary" size="medium" >Отмена</Button>
          <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
        </div>
        }
      </div>
      <Outlet />
    </section>
  );
}
