import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  }),
};
function IngredientDetails({ ingredient }) {
  return (
    <>
    <div className={styles.main}>
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
    </div>
    </>
  );
}
export default IngredientDetails;