import React, {useMemo, useState} from "react";
import burgerConstructor from './burger-contstructor.module.css'
import OrderList from "./order-list/order-list";
import ingredientIcon from "../../images/ingredient-icon.svg"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import { ingredientsDataList } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getNumber } from "../../services/actions/order-details";
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  
  const { modalState, openModal, closeModal } = useModal();
  const handleClick = () => openModal();

  const dispatch = useDispatch();

  const bunItem = useSelector((store) => store.ingredientsConstructor.bun);
  const mainItems = useSelector((store) => store.ingredientsConstructor.ingredients);

  const getOrderNumber = () => {
    if (!user) {
      navigate('/login');
      return null
    } 

    const ingredients = mainItems.map(item => item.ingredient._id);
    dispatch(getNumber([bunItem._id, ...ingredients, bunItem._id]));
    handleClick();
  }

  const bunPrice = bunItem ? bunItem.price*2 : 0;
  const mainPrice = useSelector((store) => store.order.orderDetails.total);
  const totalPrice = mainPrice + bunPrice;

  const disabled = bunPrice && mainItems.length>0 ? '' : 'disabled';

  return (
    <section className={burgerConstructor.main}>
      <OrderList/>
      <div className={"mt-2 mt-5 " + burgerConstructor.priceInfo}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <img src={ingredientIcon} className={burgerConstructor.image} alt={'Иконка цены'}></img>
        <Button htmlType="button" type="primary" size="medium" onClick={getOrderNumber} disabled={disabled}>
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
