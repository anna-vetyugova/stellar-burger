import styles from "../pages/styles.module.css"
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from "../services/actions/user-data";


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '', password: '' });
  const user = useSelector((store) => store.user.user);
  
  if (user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }
  
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  }

  return (
    <section className={styles.main}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          placeholder="E-mail"
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mb-2"
        />
        <div className={styles.button}>
          <Button htmlType="button" type="primary" size="medium" to={`/login`} onClick={onSubmit}>Войти</Button>
        </div>
        <div className={styles.links}>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link}  to={`/register`}>Зарегистрироваться</Link>
          </div>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link} to={`/forgot-password`}>Восстановить пароль</Link>
          </div>
        </div>
      </form>
    </section>
  )
}
