import React, { useRef, useMemo } from "react";
import constructorItem from "./constructor-item.module.css";
import { DragIcon, DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDrop, useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../../services/actions/burger-constructor";
import { DECREASE_TOTAL_PRICE } from "../../../services/actions/order-details";
import priceIcon from "../../../images/ingredient-icon.svg"
import { CHANGE_ITEM_POSITION } from "../../../services/actions/burger-constructor";

const ConstructorItem = (props) => {
  const { item, index } = props;

  const ref = useRef(null);

  const dispatch = useDispatch();
  const deleteIngredient = (e) => {
    const price = e.target.closest('li').getAttribute('price');
    dispatch({
      type: DELETE_INGREDIENT,
      id: e.target.closest('li').getAttribute('id')
    });
    dispatch({
      type: DECREASE_TOTAL_PRICE,
      item: price
    });
  }


  const [{ isDrag }, drag] = useDrag({
    type: "dragItem",
    item: () => {
      return { id: item.ingredient._id, index: index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "dragItem",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: CHANGE_ITEM_POSITION,
        hoverIndex: hoverIndex,
        dragIndex: dragIndex
      });
      item.index = hoverIndex
    },
  });
  drag(drop(ref));
  return (
    <li className={"mb-4 " + constructorItem.item} id={item.ingredient._id} price={item.ingredient.price} ref={ref}>
      <DragIcon type="primary" key={index} />
      <div className={"constructor-element " + constructorItem.main}>
        <img className={"constructor-element__image"} src={item.ingredient.image_mobile} alt={item.ingredient.name}></img>
        <span className={"constructor-element__text "}>{item.ingredient.name}</span>
        <span className={"constructor-element__price"}>{item.ingredient.price} <img src={priceIcon} className={constructorItem.pirceIcon}></img></span>
        <span className={"constructor-element__action pr-2"}><DeleteIcon onClick={deleteIngredient}/></span>
      </div>
    </li>

  );
};


export default ConstructorItem;