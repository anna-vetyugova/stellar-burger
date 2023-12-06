import React from "react";
import orderListStyles from "./order-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";

const OrderList = ({ bun, ingredient }) => {
  return (
    <section className={"pl-4 pr-2 " + orderListStyles.main}>
      <div className={orderListStyles.element}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={"custom-scroll mt-4 " + orderListStyles.container}>
        <ul className={orderListStyles.list}>
          {ingredient.map((item) => (
            item.type !== 'bun' ? (
              <li className={"mb-4 "  + orderListStyles.item} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  type="middle"
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ) : (
              null
            )
          ))}
        </ul> 
      </div>
      <div className={orderListStyles.element}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </section>
  );
};
OrderList.propTypes = {
  ingredient: PropTypes.arrayOf(orderListItemPropTypes)
};
ConstructorElement.propTypes = {
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
};
DragIcon.propTypes = {
  type: PropTypes.string.isRequired
};
export default OrderList;