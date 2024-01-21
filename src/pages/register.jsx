import styles from "../pages/styles.module.css"
import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { registr } from "../services/actions/user-data";
import { Navigate, useNavigate } from 'react-router-dom';

export function RegisterPage() {
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
    dispatch(registr(form));
  }

  return (
    <section className={styles.main} to={`/register`}>
      <h3 className="text text_type_main-medium">Регистрация</h3>
      <form className={styles.form} onSubmit={onSubmit}>
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
          placeholder="E-mail"
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
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
        </div>

        <div className={styles.links}>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link} to={`/login`}>Войти</Link>
          </div>
        </div>

      </form>
    </section>
  );
}
