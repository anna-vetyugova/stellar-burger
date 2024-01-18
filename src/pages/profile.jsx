import styles from "../pages/profile.module.css"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <section className={styles.main}>
      
      <div className={styles.navigation}>
        <div className={styles.navLinks}>
          <NavLink className={"text text_type_main-medium " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>Профиль</NavLink>
          <NavLink className={"text text_type_main-medium text_color_inactive " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>История заказов</NavLink>
          <NavLink className={"text text_type_main-medium text_color_inactive " + styles.navLink} style={({ isActive }) => ({ color: isActive ? '#F2F2F3' : '' })}>Выход</NavLink>
        </div>
        <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      
      <div className={styles.inputs}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          width="480px"
          onChange={onChange}
          aria-required={true}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="Логин"
          isIcon={false}
          extraClass="mb-2"
          aria-required={true}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mb-2"
          aria-required={true}
        />

      
      </div>
      <Outlet />
    </section>
  );
}
