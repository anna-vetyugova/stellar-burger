import React from "react";
import { data } from "../../utils/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredients from "./ingredients/ingredients";


function BurgerIngredientsTabs() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }} className="mb-5">
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
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
          ingredients={data.filter((item) => {
            return item.type === "bun";
          })}
        />
        <Ingredients
          type="Соусы"
          ingredients={data.filter((item) => {
            return item.type === "sauce";
          })}
        />
        <Ingredients
          type="Начинка"
          ingredients={data.filter((item) => {
            return item.type === "main";
          })}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
