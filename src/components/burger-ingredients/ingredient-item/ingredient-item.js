
import ingredientItemStyles from "../ingredient-item/ingredient-item.module.css";
import ingredientIcon from "../../../images/ingredient-icon.svg"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";
import { SET_INGREDIENT_ITEM } from "../../../services/actions/ingredient-details";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

const IngredientItem = ({ ingredient, onOpen }) => {
  const handleClick = () => onOpen(ingredient);
  const dispatch = useDispatch();
  const setIngredientItem = () => {
    return dispatch({ type: SET_INGREDIENT_ITEM, ingredient });
  };

  const {id, content} = ingredient._id;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  return ( 
    <li className={ingredientItemStyles.ingredient} onClick={() => { handleClick(); setIngredientItem()}}>
      <Counter count={233} size="small" className={ingredientItemStyles.counter} />
      <img src={ingredient.image} alt={ingredient.name} className={"pl-4 pr-4 " + ingredientItemStyles.image} ref={dragRef}></img>
      <div className={"mt-2 mb-2 " + ingredientItemStyles.priceInfo}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <img src={ingredientIcon} alt={ingredient.name}></img>
      </div>
      <h4 className="text text_type_main-default" style={{ textAlign: 'center' }}>{ingredient.name}</h4>
      {content}
    </li>
  )
}
Counter.propTypes = {
  count: PropTypes.number
};
IngredientItem.propTypes = {
  ingredient: orderListItemPropTypes,
  onOpen: PropTypes.func.isRequired
};
export default IngredientItem;