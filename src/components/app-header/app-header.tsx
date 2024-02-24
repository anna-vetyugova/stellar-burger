import React, { FC } from "react";
import headerStyles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const AppHeader: FC = () => {
  const location = useLocation(); 
  return (
    <header className={headerStyles.header}> 
      <div className={headerStyles.container}>
        <div className={headerStyles.links}> 
          <NavLink to={`/`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <BurgerIcon type={(location.pathname === '/') ? "primary" : "secondary"} />
            Конструктор
          </NavLink>
          <NavLink to={`/feed`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <ListIcon type={(location.pathname.includes('/feed')) ? "primary" : "secondary"} />
            Лента заказов
          </NavLink>
          <a href="/" className={headerStyles.logo}><Logo /></a>
        </div>
        <NavLink to={`/profile`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <ProfileIcon type={(location.pathname.includes('/profile')) ? "primary" : "secondary"} />
            Личный кабинет
          </NavLink>
      </div>
    </header>
  );
}
export default AppHeader;