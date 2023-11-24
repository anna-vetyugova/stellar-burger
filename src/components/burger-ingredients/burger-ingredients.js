import React from "react";
import { data } from "../../utils/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredients from "./ingredients/ingredients";


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

function BurgerIngredients() {
  return (
    <section className={burgerIngredientsStyles.main}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      {BurgerIngredientsTabs()}
      <div className={"mt-5 custom-scroll " + burgerIngredientsStyles.menu}>
        <Ingredients
          type="Булки"
          id="bun-tab"
          ingredients={data.filter((item) => {
            return item.type === "bun";
          })}
        />
        <Ingredients
          type="Соусы"
          id="sauce-tab"
          ingredients={data.filter((item) => {
            return item.type === "sauce";
          })}
        />
        <Ingredients
          type="Начинка"
          id="main-tab"
          ingredients={data.filter((item) => {
            return item.type === "main";
          })}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
