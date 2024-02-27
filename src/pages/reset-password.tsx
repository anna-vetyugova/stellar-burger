import styles from "../pages/styles.module.css"
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef, useEffect, FC, ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from "../utils/burger-api";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";

export function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user.user); 
  
  const [form, setValue] = useState({ password: '', token: '' });
  
  const isReset = localStorage.getItem('isReset');
  useEffect(() => {
    if(!isReset) {
      navigate('/forgot-password');
    }
   }, [isReset, navigate]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.resetPassword(form).then((res) => {
      localStorage.removeItem('isReset');
      navigate('/login');
    }).catch(res => console.error(res))
  }
  return (
    <section className={styles.main}>
      <h3 className="text text_type_main-medium">Восстановаление пароля</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mb-2"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
          width="480px"
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>

        <div className={styles.links}>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link} to={`/login`}>Войти</Link>
          </div>
        </div>
      </form>
    </section>
  )
}
