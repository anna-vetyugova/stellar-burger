import styles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-contstructor/burger-contstructor";

import React, {useState, useEffect} from "react";


function App() {

  const [state, setState] = useState({ 
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {
    const getBurgerIngredients = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      getIngredients()
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