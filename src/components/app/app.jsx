import styles from "./app.module.css";
//import { getIngredients } from "../../utils/burger-api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-contstructor/burger-contstructor";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsList } from "../../services/actions/burger-ingredients";

function App() {
  
  const { ingredients, currentIngredients } = useSelector(store => ({
    ingredients: store.ingredientsList.ingredients,
    currentIngredients: store.ingredientsConstructor.currentIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsList());
   }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor bun={currentIngredients.bun} ingredients={currentIngredients.ingredients} />
      </main>
    </div>
  );
}

export default App;