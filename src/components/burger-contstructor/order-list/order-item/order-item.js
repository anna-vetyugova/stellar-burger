import React from "react";
import ingredientIcon from "../../../../images/ingredient-icon.svg";
import orderItemStyles from "./order-item.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderItem = ({ ingredient }) => {
  return (
    <li className={"mb-4 " + orderItemStyles.main}>
      <div><DragIcon type="primary" /></div>
      <div className={orderItemStyles.container}>
        <img src={ingredient.image_mobile} alt={ingredient.name} className={"pl-4 pr-4 " + orderItemStyles.image}></img>
        <h4 className="text text_type_main-small" style={{ textAlign: 'left' }}>{ingredient.name}</h4>
        <div className={"mt-2 mb-2"}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <img src={ingredientIcon} alt={ingredient.name}></img>
        </div>
      </div>
    </li>
  );
};
export default OrderItem;