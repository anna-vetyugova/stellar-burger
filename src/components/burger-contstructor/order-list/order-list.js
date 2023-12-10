import React, { useRef, useMemo } from "react";
import orderListStyles from "./order-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { INCREASE_TOTAL_PRICE } from "../../../services/actions/order-details";
import ConstructorItem from "../constructor-item/constructor-item";

const OrderList = () => {
  const dispatch = useDispatch();

  const bunItem = useSelector((store) => store.ingredientsConstructor.bun);
  const mainItems = useSelector((store) => store.ingredientsConstructor.ingredients);
  const ingredients = mainItems ? mainItems : null;

  const [{ isHover }, dropTarget] = useDrop({
    accept: ["ingredient"],
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const type = item.ingredient.type === 'bun' ? 'ADD_BUN_INGREDIENT' : 'ADD_MAIN_INGREDIENT';
      dispatch({
        type: type,
        ingredient: item.ingredient,
        uniqueId: uuidv4()
      });
      dispatch({
        type: INCREASE_TOTAL_PRICE,
        total: item.ingredient.type !== 'bun' ? item.ingredient.price : 0
      })
    },
  });
  

  const refIngrList = useRef(null);
  return (
    <section className={"pr-2 " + orderListStyles.main} ref={dropTarget}> 

      { !bunItem && <div className={"constructor-element constructor-element_pos_top " + orderListStyles.headers}>Выберите булки</div> }
      { bunItem && 
        <div className={orderListStyles.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunItem.name + " (верх)"}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </div> 
      }

      { !ingredients[0] && <div className={"constructor-element " + orderListStyles.headers}>Выберите начинку</div> }
      { ingredients[0] && 
        <div className={"custom-scroll mt-4 " + orderListStyles.container} >
          <ul className={orderListStyles.list} ref={refIngrList}>
            {ingredients.map((item, index) => (
              <ConstructorItem item={item} key={item.key} index={index} />
            ))}
          </ul> 
        </div> 
      }

      { !bunItem && <div className={"constructor-element constructor-element_pos_bottom " + orderListStyles.headers}>Выберите булки</div> }
      { bunItem && 
        <div className={orderListStyles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bunItem.name + " (низ)"}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </div> 
      }
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