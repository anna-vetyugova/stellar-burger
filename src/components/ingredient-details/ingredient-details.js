import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsDataList } from "../../utils/prop-types";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useState } from "react";
import { SET_INGREDIENT_ITEM } from "../../services/actions/ingredient-details";
function IngredientDetails() {
  const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  const { ingredientId } = useParams();

  const ingregientItem = ingredients.find(item => item._id === ingredientId);

  if (!ingredients) {
    return null;
  }

  // const { name, image_large, calories, proteins, fat, carbohydrates } = useSelector(store => ({
  //   name: store.ingredientDetails.itemIngredient.name,
  //   image_large: store.ingredientDetails.itemIngredient.image_large,
  //   calories: store.ingredientDetails.itemIngredient.calories,
  //   proteins: store.ingredientDetails.itemIngredient.proteins,
  //   fat: store.ingredientDetails.itemIngredient.fat,
  //   carbohydrates: store.ingredientDetails.itemIngredient.carbohydrates
  // }));

  return (
    <>
    <section className={styles.main}>
      <img className={styles.image + " pl-5 pr-5"} src={ingregientItem.image_large} alt={ingregientItem.name}></img>
      <div className={styles.content}>
        <h3 className="text text_type_main-medium">{ingregientItem.name}</h3>
        <div className={styles.components}>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
            <span className="text text_type_main-default text_color_inactive">{ingregientItem.calories}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingregientItem.proteins}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingregientItem.fat}</span>
          </div>
          <div className={styles.component}>
            <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
            <span className="text text_type_main-default text_color_inactive">{ingregientItem.carbohydrates}</span>
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