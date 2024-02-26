import React, { useRef, useMemo, FC, useState } from "react";

import orderListStyles from "./order-list.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrop, useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

import { INCREASE_TOTAL_PRICE } from "../../../services/actions/order-details";
import ConstructorItem from "../constructor-item/constructor-item";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TIngredients } from "../../../utils/prop-types";


const OrderList: FC = () => {  
  const dispatch = useAppDispatch();

  const ingredientsConstructor = useAppSelector((store) => store.ingredientsConstructor);
  const bunItem : TIngredients = ingredientsConstructor['bun'];
  const mainItems: {key: string, ingredient: TIngredients}[] = ingredientsConstructor['ingredients'];

  const [{ isHover }, dropTarget] = useDrop({
    accept: ["ingredient"],
    collect: (monitor: { isOver: () => any; }) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: { ingredient: { type: string; price: any; }; }) {
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
  
  // const refIngrList = useRef(null);
  const refIngrList = useRef<HTMLUListElement>(null);

  return (
    <section className={"pr-2 " + orderListStyles.main} ref={dropTarget}> 

      { !bunItem && <div className={orderListStyles.headers + " " + orderListStyles.top}>Выберите булки</div> }
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

      { mainItems.length === 0 && <div className={orderListStyles.headers}>Выберите начинку</div> }
      { mainItems.length > 0 && 
        <div className={"custom-scroll mt-4 " + orderListStyles.container} >
          <ul className={orderListStyles.list} ref={refIngrList}>
            { mainItems.map((item, index) => (
              <ConstructorItem item={item.ingredient} key={item.key} index={index} />
            ))}
          </ul> 
        </div> 
      }

      { !bunItem && <div className={orderListStyles.headers + " " + orderListStyles.bottom}>Выберите булки</div> }
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

export default OrderList;