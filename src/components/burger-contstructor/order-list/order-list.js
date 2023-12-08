import React, { useRef, useMemo } from "react";
import orderListStyles from "./order-list.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { DELETE_INGREDIENT } from "../../../services/actions/burger-constructor";

const OrderList = () => {
  const dispatch = useDispatch();
  const refIngrList = useRef(null)

  const bunItem = useSelector((store) => store.ingredientsConstructor.bun);
  const mainItems = useSelector((store) => store.ingredientsConstructor.ingredients);

  const ingredients = mainItems ? mainItems : null;



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
  const deleteIngredient = (e) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: e.target.closest('li').getAttribute('id')
    });
  }

  // const bunPrice = bunItem ? bunItem.price : 0;
  // function filterTodos(price) {
  //   console.log(price*2);
  // }
  // const visibleTodos = useMemo(
  //   () => filterTodos(todos, tab),
  //   [todos, tab]
  // );
  
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
          <ul className={orderListStyles.list}>
            {ingredients.map((item) => (
              <li className={"mb-4 "  + orderListStyles.item} key={item.key} id={item.ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  type="middle"
                  isLocked={false}
                  text={item.ingredient.name}
                  price={item.ingredient.price}
                  thumbnail={item.ingredient.image}
                  handleClose={deleteIngredient}
                />
              </li>
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