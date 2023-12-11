import styles from "./app.module.css";
//import { getIngredients } from "../../utils/burger-api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-contstructor/burger-contstructor";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsList } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  
  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredientsList.ingredients,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsList());
   }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;