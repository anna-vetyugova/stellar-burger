import React, { FC } from "react";
import ingredientsStyles from "../ingredients/ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { TIngredients } from "../../../utils/prop-types";

export type TIngredientsList= {
  type: string;
  ingredients: ReadonlyArray<TIngredients> ;
  onOpen(value: object): void;
  id: string
  } 
const Ingredients: FC<TIngredientsList> = ({ 
  type, 
  ingredients,
  id, 
  onOpen
  }) => {  
  const location = useLocation();
  return (
    <section id={id}>
      <h3 className="text text_type_main-medium">{type}</h3>
      <ul className={ingredientsStyles.list}>
        {ingredients.map((item) => (
          <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location }} className={ingredientsStyles.link}>
            <IngredientItem ingredient={item} onOpen={onOpen} />
          </Link>
        ))}
      </ul>
     </section>
  );
};

export default Ingredients;