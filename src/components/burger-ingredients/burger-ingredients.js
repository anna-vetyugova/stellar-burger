import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredients from "./ingredients/ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';

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

function BurgerIngredientsTabs() {
  const [current, setCurrent] = React.useState("bun-tab");
  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div style={{ display: "flex" }} className="mb-5">
      <Tab id="bun-tab" value="bun-tab" active={current === "bun-tab"} onClick={setTab}>
        Булки
      </Tab>
      <Tab id="sauce-tab" value="sauce-tab" active={current === "sauce-tab"} onClick={setTab}>
        Соусы
      </Tab>
      <Tab id="main-tab" value="main-tab" active={current === "main-tab"} onClick={setTab}>
        Начинки
      </Tab>
    </div>
  );
}

// function BurgerIngredients() {
const BurgerIngredients = ({ingredients}) => {
  const [ingredient, setModalState] = useState(false);
  return (
    <section className={burgerIngredientsStyles.main}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      {BurgerIngredientsTabs()}
      <div className={"mt-5 custom-scroll " + burgerIngredientsStyles.menu}>
        <Ingredients
          type="Булки"
          id="bun-tab"   
          onOpen={setModalState}
          ingredients={ingredients.filter((item) => {
            return item.type === "bun";
          })}
        />
        <Ingredients
          type="Соусы"
          id="sauce-tab"
          onOpen={setModalState}
          ingredients={ingredients.filter((item) => {
            return item.type === "sauce";
          })}
        />
        <Ingredients
          type="Начинка"
          id="main-tab"
          onOpen={setModalState}
          ingredients={ingredients.filter((item) => {
            return item.type === "main";
          })}
        />
      </div>
      { ingredient && 
          <Modal closeModal={ () => setModalState(false) } header={"Детали ингредиента"}>
            <IngredientDetails ingredient={ingredient} />
          </Modal> }
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsDataList)
};
export default BurgerIngredients;
