import React from "react";
import headerStyles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function AppHeader() {
  return (
    <header className={headerStyles.header}> 
      <div className={headerStyles.container}>
        <div className={headerStyles.links}>
          <a href="#" className={headerStyles.link}><BurgerIcon/><p className="text text_type_main-default ml-2">Конструктор</p></a>
          <a href="#" className={headerStyles.link}><ListIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p></a>
          <a href="#" className={headerStyles.logo}><Logo /></a>
        </div>
        <a href="#" className={headerStyles.link}><ProfileIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p></a>
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