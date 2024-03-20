import styles from "../pages/styles.module.css"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, FC, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/burger-api";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";
import { stringify } from "uuid";

export const ForgotPassword: FC = () => {    
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '' });
  const user = useAppSelector((store) => store.user.user);
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  }

  

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
    api.forgetPassword(form, accessToken).then((res) => {
      localStorage.setItem("isReset", 'true');
      navigate('/reset-password');
    }).catch(res => console.error(res))
    }
  }
  return (
    <section className={styles.main}>
      <h3 className="text text_type_main-medium">Восстановаление пароля</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          placeholder="E-mail"
          extraClass="mb-2"
        />
     
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
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
