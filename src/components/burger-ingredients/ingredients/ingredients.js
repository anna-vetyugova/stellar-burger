import React, { useState } from "react";
import ingredientsStyles from "../ingredients/ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Ingredients = ({ type, ingredients, id, onOpen,  }) => {
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
Ingredients.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredient: PropTypes.arrayOf(orderListItemPropTypes),
  onOpen: PropTypes.func.isRequired
}
export default Ingredients;