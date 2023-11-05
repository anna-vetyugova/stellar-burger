import React from "react";
import burgerConstructor from './burger-contstructor.module.css'
import OrderList from "./order-list/order-list";
import ingredientIcon from "../../images/ingredient-icon.svg"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

function BurgerConstructor() {

  return (
    <section className={burgerConstructor.main}>
      <OrderList
          ingredient={data.map((item) => {
            return item;
          })}
        />
      <div className={"mt-2 mb-2 " + burgerConstructor.priceInfo}>
        <span className="text text_type_digits-medium">100</span>
        <img src={ingredientIcon} className={burgerConstructor.image} alt={'Иконка цены'}></img>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
