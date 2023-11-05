import React from "react";
import ingredientsStyles from "../ingredients/ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";

const Ingredients = ({ type, ingredients }) => {
  return (
    <section className={"custom-scroll " + ingredientsStyles.container}>
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
