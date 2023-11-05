import React from "react";
import ingredientItemStyles from "../ingredient-item/ingredient-item.module.css";
import ingredientIcon from "../../../images/ingredient-icon.svg"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ ingredient }) => {
  return (
    <li className={ingredientItemStyles.ingredient}>
      <Counter count={233} size="small" className={ingredientItemStyles.counter} />
      <img src={ingredient.image} alt={ingredient.name} className={"pl-4 pr-4 " + ingredientItemStyles.image}></img>
      <div className={"mt-2 mb-2 " + ingredientItemStyles.priceInfo}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <img src={ingredientIcon} alt={ingredient.name}></img>
      </div>
      <h4 className="text text_type_main-default" style={{ textAlign: 'center' }}>{ingredient.name}</h4>
    </li>
  )
}

export default IngredientItem;