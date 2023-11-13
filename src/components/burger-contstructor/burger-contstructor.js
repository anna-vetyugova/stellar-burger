import React from "react";
import burgerConstructor from './burger-contstructor.module.css'
import OrderList from "./order-list/order-list";
import ingredientIcon from "../../images/ingredient-icon.svg"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';

const ingredientsDataList = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

const BurgerConstructor = ({ingredients}) => {
  const { modalState, openModal, closeModal } = useModal();
  return (
    <section className={burgerConstructor.main}>
      <OrderList
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
