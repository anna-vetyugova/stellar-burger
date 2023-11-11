import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-contstructor/burger-contstructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = useState({ 
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {
    const getBurgerIngredients = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`${url}`)
      .then(res => res.json())
      .then(res => setState({ ...state, data: res.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    }

    getBurgerIngredients();
  }, []);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients ingredients={state.data} />
        <BurgerConstructor ingredients={state.data} />
      </main>
    </div>
  );
}

export default App;