import styles from "../pages/profile.module.css"
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from "../services/actions/user-data";

export function ProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  
  const [isActive, setActive] = useState(false);
  const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setActive(true);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
  }

  const onReset = (e) => {
    setValue({ ...form, name : user.name, email: user.email, password: '' });
  }
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setIsDisabled(!isDisabled);
    setTimeout(() => inputRef.current.focus(), 0)
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
        isIcon={false}
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
