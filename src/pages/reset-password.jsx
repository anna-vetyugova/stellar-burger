import styles from "../pages/styles.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";


export function ResetPassword() {

  const [value, setValue] = useState(null)
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <section className={styles.main}>
      <h3 className="text text_type_main-medium">Восстановаление пароля</h3>
      <form className={styles.form}>
        <Input
        type={'text'}
        placeholder={'Введите новый пароль'}
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
        placeholder={'Введите код из письма'}
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
        <div className={styles.button}>
          <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
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
