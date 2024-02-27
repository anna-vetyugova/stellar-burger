import styles from "../pages/styles.module.css"
import { EmailInput, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, FC, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navigate } from 'react-router-dom';
import { login } from "../services/actions/user-data";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";

export const LoginPage: FC = () => {   
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ email: '', password: '' });
  const user = useAppSelector((store) => store.user.user);

  if (user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
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
          <Button htmlType="submit" type="primary" size="medium">Войти</Button>
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
