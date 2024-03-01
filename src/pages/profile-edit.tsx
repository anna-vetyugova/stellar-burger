import styles from "../pages/profile.module.css"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, FC, MouseEvent, useRef, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { updateUserProfile } from "../services/actions/user-data";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";

export const ProfileEdit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((store) => store.user.user);

  const [isActive, setActive] = useState(false);
  const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue({ ...form, [target.name]: target.value });
    setActive(true);
  }
  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) dispatch(updateUserProfile({ name: form.name, email: form.email, password: ''}, accessToken));
  }

  const onReset = () => {
    setValue({ 
      ...form, 
      name : user.name, 
      email: user.email, 
      password: '' });
  }
  const [isDisabled, setIsDisabled] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setIsDisabled(!isDisabled);
  };


  return ( 
    <form className={styles.inputs} onSubmit={onSubmit}>
      <Input
        type={'text'}
        placeholder='Имя'
        name='name'
        value={form.name}
        onChange={onChange}
        size={'default'}
        icon={"EditIcon"}
        error={false}
        errorText={'Ошибка'}
        extraClass="ml-1"
        disabled={isDisabled}
        onIconClick={onIconClick}
        ref={inputRef}
        onBlur={onIconClick}
      />
      <EmailInput
        onChange={onChange}
        value={form.email}
        name={'email'}
        placeholder="Логин"
        extraClass="mb-2"
        aria-required={true}
        isIcon={true}
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        icon="EditIcon"
      />
      { isActive && 
      <div>
        <Button htmlType="button" type="secondary" size="medium" onClick={onReset}>Отмена</Button>
        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
      </div>
      }
    </form> 
  );
}
