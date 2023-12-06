import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsDataList } from "../../utils/prop-types";


function IngredientDetails() {
  const { name, image_large, calories, proteins, fat, carbohydrates } = useSelector(store => ({
    name: store.ingredientDetails.itemIngredient.name,
    image_large: store.ingredientDetails.itemIngredient.image_large,
    calories: store.ingredientDetails.itemIngredient.calories,
    proteins: store.ingredientDetails.itemIngredient.proteins,
    fat: store.ingredientDetails.itemIngredient.fat,
    carbohydrates: store.ingredientDetails.itemIngredient.carbohydrates
  }));
  return (
    <>
    <section className={styles.main}>
      <img className={styles.image + " pl-5 pr-5"} src={image_large} alt={name}></img>
      <div className={styles.content}>
        <h3 className="text text_type_main-medium">{name}</h3>
        <div className={styles.components}>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
            <span className="text text_type_main-default text_color_inactive">{calories}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
            <span className="text text_type_main-default text_color_inactive">{proteins}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
            <span className="text text_type_main-default text_color_inactive">{fat}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
            <span className="text text_type_main-default text_color_inactive">{carbohydrates}</span>
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