import React from "react";
import ingredientsStyles from "../ingredients/ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from 'prop-types';

Ingredients.propTypes = {
  type: PropTypes.string.isRequired,
  ingredient: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  )
}

const Ingredients = ({ type, ingredients }) => {
  return (
    <section>
      <h3 className="text text_type_main-medium">{type}</h3>
      <ul className={ingredientsStyles.list}>
        {ingredients.map((item) => (
          <IngredientItem ingredient={item} key={item._id} />
        ))}
      </ul>
    </section>
  );
};
export default Ingredients;
