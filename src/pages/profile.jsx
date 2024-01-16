import styles from "../pages/profile.module.css"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

export function Profile() {
  const [isActive, setActive] = useState(true);


  const [value, setValue] = useState(null)
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  
  
  return (
    <section className={styles.main}>
      
      <div className={styles.navigation}>
        <div className={styles.navLinks}>
          <NavLink className={"text text_type_main-medium " + styles.navLink} style={{ "color": isActive ? "#F2F2F3" : "" }}>Профиль</NavLink>
          <NavLink className={"text text_type_main-medium text_color_inactive " + styles.navLink}>История заказов</NavLink>
          <NavLink className={"text text_type_main-medium text_color_inactive " + styles.navLink}>Выход</NavLink>
        </div>
        <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      
      <div className={styles.inputs}>
        <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
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
        placeholder={'Логин'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        />
        <Input
        type={'text'}
        placeholder={'Пароль'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        />

      </div>
    </section>
  );
}
