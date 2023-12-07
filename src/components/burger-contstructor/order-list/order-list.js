import React, { useRef } from "react";
import orderListStyles from "./order-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const OrderList = () => {
  const dispatch = useDispatch();
  const refIngrList = useRef(null)
  
  const burgerIngredients = useSelector((store) => store.ingredientsList.ingredients);
  const bunItem = useSelector((store) => store.ingredientsList.ingredients.filter(item => item._id === store.ingredientsConstructor.bun));
  const mainItems = useSelector((store) => store.ingredientsConstructor.ingredients);

  const ingredients = mainItems ? mainItems.map((item) => {
      const newItem = burgerIngredients.filter(itm => itm._id === item);
      return newItem[0]
    }) 
    : null;
  const bun = bunItem && bunItem.length > 0 ? bunItem[0] : null;

  const [{ isHover }, dropTarget] = useDrop({
    accept: ["ingredient"],
    drop(item) {
      const type = item.ingredient.type === 'bun' ? 'ADD_BUN_INGREDIENT' : 'ADD_MAIN_INGREDIENT';
      dispatch({
        type: type,
        ingredient: item.ingredient,
        uniqueId: uuidv4()
      })
    }
  });
 

  return (
    <section className={"pr-2 " + orderListStyles.main} ref={dropTarget}>

      { !bun && <div className={"constructor-element constructor-element_pos_top " + orderListStyles.headers}>Выберите булки</div> }
      { bun && 
        <div className={orderListStyles.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div> 
      }

      { !ingredients && <div className={"constructor-element " + orderListStyles.headers}>Выберите начинку</div> }
      { ingredients && 
        <div className={"custom-scroll mt-4 " + orderListStyles.container} >
          <ul className={orderListStyles.list}>
            {ingredients.map((item) => (
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
      }

      { !bun && <div className={"constructor-element constructor-element_pos_bottom " + orderListStyles.headers}>Выберите булки</div> }
      { bun && 
        <div className={orderListStyles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
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