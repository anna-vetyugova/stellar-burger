import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-contstructor/burger-contstructor";

import PropTypes from 'prop-types';
import React, {useState, useEffect} from "react";

const ingredientsDataList = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});


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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsDataList)
};
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsDataList)
};
export default App;