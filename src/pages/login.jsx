import styles from "../pages/login.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";


export function LoginPage() {

  const [value, setValue] = useState(null)
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <section className={styles.main}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <div className={styles.inputs}>
        <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={e => setValue(e.target.value)}
        // icon={'CurrencyIcon'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        width="480px"
        />
        <Input
        type={'text'}
        placeholder={'Пароль'}
        onChange={e => setValue(e.target.value)}
        icon={'ShowIcon'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        />
        <div className={styles.button}>
          <Button htmlType="button" type="primary" size="medium">Войти</Button>
        </div>
        <div className={styles.links}>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link}>Зарегистрироваться</Link>
          </div>
          <div className={styles.linkContainer}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link className={"text text_type_main-default text_color_active " + styles.link}>Восстановить пароль</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
