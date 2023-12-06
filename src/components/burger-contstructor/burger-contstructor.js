import React from "react";
import burgerConstructor from './burger-contstructor.module.css'
import OrderList from "./order-list/order-list";
import ingredientIcon from "../../images/ingredient-icon.svg"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import { ingredientsDataList } from "../../utils/prop-types";


const BurgerConstructor = ({bun, ingredients}) => {
  const { modalState, openModal, closeModal } = useModal();
  return (
    <section className={burgerConstructor.main}>
      <OrderList
          bun={bun}
          ingredient={ingredients.map((item) => {
            return item;
          })}
        />
      <div className={"mt-2 mt-5 " + burgerConstructor.priceInfo}>
        <span className="text text_type_digits-medium">100</span>
        <img src={ingredientIcon} className={burgerConstructor.image} alt={'Иконка цены'}></img>
        <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {modalState && <Modal closeModal={closeModal} ><OrderDetails /></Modal>}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsDataList)
};

export default BurgerConstructor;
