import React from "react";
import headerStyles from "./app-header.module.css";
import "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}> 
        <div className={headerStyles.container}>
          <div className={headerStyles.links}>
            <a href="#" className={headerStyles.link}><BurgerIcon/><p className="text text_type_main-default ml-2">Конструктор</p></a>
            <a href="#" className={headerStyles.link}><ListIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p></a>
          </div>
          <a href="#" className={headerStyles.link}><Logo /></a>
          <a href="#" className={headerStyles.link}><ProfileIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p></a>
        </div>
      </header>
    );
  }
}

export default AppHeader;