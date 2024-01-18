import React from "react";
import headerStyles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function AppHeader() {
  const location = useLocation(); 
  return (
    <header className={headerStyles.header}> 
      <div className={headerStyles.container}>
        <div className={headerStyles.links}> 
          <NavLink to={`/`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <BurgerIcon type={(location.pathname === '/') ? "primary" : "secondary"} />
            Конструктор
          </NavLink>
          <NavLink to={`/orders`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <ListIcon type={(location.pathname === '/orders') ? "primary" : "secondary"} />
            Лента заказов
          </NavLink>
          <a href="/" className={headerStyles.logo}><Logo /></a>
        </div>
        <NavLink to={`/profile`} className={headerStyles.link} style={({ isActive }) => ({ color: isActive ? '#f2f2f3' : '#8585AD' })}>
            <ProfileIcon type={(location.pathname === '/profile') ? "primary" : "secondary"} />
            Личный кабинет
          </NavLink>
      </div>
    </header>
  );
}
ListIcon.propTypes = {
  type: PropTypes.string.isRequired
};
ProfileIcon.propTypes = {
  type: PropTypes.string.isRequired
};
export default AppHeader;