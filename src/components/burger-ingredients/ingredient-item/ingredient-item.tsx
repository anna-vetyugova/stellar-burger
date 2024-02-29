
import { FC } from "react";
import ingredientItemStyles from "../ingredient-item/ingredient-item.module.css";
import ingredientIcon from "../../../images/ingredient-icon.svg"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { SET_INGREDIENT_ITEM } from "../../../services/constants";
import { useDrag } from "react-dnd";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { TIngredientItem, TIngredients } from "../../../services/types/data";

const IngredientItem: FC<TIngredientItem> = ({ 
    ingredient, 
    onOpen 
  }) => {  
    
  const handleClick = () => onOpen(ingredient);
  const dispatch = useAppDispatch();
  const setIngredientItem = () => {
    return dispatch({ type: SET_INGREDIENT_ITEM, ingredient });
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  const ingredientsConstructor = useAppSelector((store) => store.ingredientsConstructor);
  const bunItem : TIngredients = ingredientsConstructor['bun'];
  const ingredients: {key: string, ingredient: TIngredients}[] = ingredientsConstructor['ingredients'];
  
  const bunCounter = bunItem && bunItem._id === ingredient._id ? 2 : null ; 
  const currentIem = ingredients.find(item => item.ingredient._id === ingredient._id);
  const itemCounter = currentIem ? currentIem.ingredient.__v : null;

  const counter = ingredient.type === 'bun' ? bunCounter : itemCounter;
  return ( 
    <li className={ingredientItemStyles.ingredient} onClick={() => { handleClick(); setIngredientItem()}} key={ingredient._id}>
      { counter && <span className={ingredientItemStyles.counter}><Counter count={counter} size="small" /></span> }
      <img src={ingredient.image} alt={ingredient.name} className={"pl-4 pr-4 " + ingredientItemStyles.image} ref={dragRef}></img>
      <div className={"mt-2 mb-2 " + ingredientItemStyles.priceInfo}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <img src={ingredientIcon} alt={ingredient.name}></img>
      </div>
      <h4 className="text text_type_main-default" style={{ textAlign: 'center' }}>{ingredient.name}</h4>
    </li>
  )
}
// Counter.propTypes = {
//   count: PropTypes.number
// };
// IngredientItem.propTypes = {
//   ingredient: orderListItemPropTypes,
//   onOpen: PropTypes.func.isRequired
// };
export default IngredientItem;