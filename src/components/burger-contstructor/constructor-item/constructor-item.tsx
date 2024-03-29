import React, { useRef, useMemo, FC, MouseEvent, ReactNode } from "react";
import constructorItem from "./constructor-item.module.css";
import { DragIcon, DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDrop, useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";

import { DELETE_INGREDIENT } from "../../../services/constants";
import { DECREASE_TOTAL_PRICE } from "../../../services/constants";
import { CHANGE_ITEM_POSITION } from "../../../services/constants";

import priceIcon from "../../../images/ingredient-icon.svg"
import { useAppDispatch } from "../../hooks/hooks";

import { TIngredients, TConstructorItem } from "../../../services/types/data";
import { Identifier } from "dnd-core";

const ConstructorItem: FC<TConstructorItem> = ({ 
  item, 
  index 
}) => {  

  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useAppDispatch();

  const deleteIngredient = (event: MouseEvent<HTMLSpanElement>) => {
    const target = (event.target as HTMLElement).closest('li') as HTMLLIElement;
    const price = target.getAttribute('data-price');
    const id = target.getAttribute('id');
    if (id) {
      dispatch({
        type: DELETE_INGREDIENT,
        id: id
      });
    }
    if (price) {
      dispatch({
        type: DECREASE_TOTAL_PRICE,
        item: price
      });
    } 
  }

  const [{ isDrag }, drag] = useDrag({
    type: "dragItem",
    item: () => {
      return { id: item._id, index: index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

const [{ handlerId }, drop] = useDrop<
  {
    ingredient: TIngredients; // описание полей ингредиента
    index: number;
  },
  unknown,
  { handlerId: Identifier | null } // тип из библиотеки dnd-core
>({
  accept: "dragItem",
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    };
  },
  hover(item, monitor) {
    if (!ref.current) {
        return
    }
    const dragIndex = item.index
    const hoverIndex = index; 
    if (dragIndex === hoverIndex) {
      return
    }
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();
    if (!hoverBoundingRect || !clientOffset) return;
    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    dispatch({
      type: CHANGE_ITEM_POSITION,
      hoverIndex: hoverIndex,
      dragIndex: dragIndex
    });
    item.index = hoverIndex;
  },
});

  drag(drop(ref));

  return item ? (
    <li className={"mb-4 " + constructorItem.item} id={item._id} data-price={item.price} ref={ref}>
      <DragIcon type="primary" key={index} />
      <div className={"constructor-element " + constructorItem.main}>
        <img className={"constructor-element__image"} src={item.image_mobile} alt={item.name}></img>
        <span className={"constructor-element__text "}>{item.name}</span>
        <span className={"constructor-element__price"}>{item.price} <img src={priceIcon} className={constructorItem.pirceIcon}></img></span>
        <span className={"constructor-element__action pr-2"} onClick={deleteIngredient}><DeleteIcon  type={"secondary"}/></span>
      </div>
    </li>
  ) : null;
};


export default ConstructorItem;