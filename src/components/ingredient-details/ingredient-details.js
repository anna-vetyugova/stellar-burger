import React from "react";
import styles from "./ingredient-details.module.css";

import { ingredientsDataList } from "../../utils/prop-types";

function IngredientDetails({ ingredient }) {
  return (
    <>
    <section className={styles.main}>
      <img className={styles.image + " pl-5 pr-5"} src={ingredient.image_large} alt={ingredient.name}></img>
      <div className={styles.content}>
        <h3 className="text text_type_main-medium">{ingredient.name}</h3>
        <div className={styles.components}>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
            <span className="text text_type_main-default text_color_inactive">{ingredient.calories}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingredient.proteins}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingredient.fat}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientsDataList
};

export default IngredientDetails;