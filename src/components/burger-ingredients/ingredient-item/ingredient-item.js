import React, {useState} from "react";
import ingredientItemStyles from "../ingredient-item/ingredient-item.module.css";
import ingredientIcon from "../../../images/ingredient-icon.svg"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

const IngredientItem = ({ ingredient }) => {
  const { modalState, openModal, closeModal } = useModal();
  return (
    <li className={ingredientItemStyles.ingredient} onClick={openModal}>
      <Counter count={233} size="small" className={ingredientItemStyles.counter} />
      <img src={ingredient.image} alt={ingredient.name} className={"pl-4 pr-4 " + ingredientItemStyles.image}></img>
      <div className={"mt-2 mb-2 " + ingredientItemStyles.priceInfo}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <img src={ingredientIcon} alt={ingredient.name}></img>
      </div>
      <h4 className="text text_type_main-default" style={{ textAlign: 'center' }}>{ingredient.name}</h4>
      {modalState && <Modal closeModal={closeModal} header={"Детали ингредиента"}><IngredientDetails ingredient={ingredient} /></Modal>}
    </li>
  )
}
Counter.propTypes = {
  count: PropTypes.number
};
IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })
};
export default IngredientItem;