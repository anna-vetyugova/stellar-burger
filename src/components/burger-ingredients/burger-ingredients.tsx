import React, { useState, useRef, FC, ForwardedRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredients from "./ingredients/ingredients";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { TAB_SWITCH } from "../../services/constants";

const BurgerIngredientsTabs = React.forwardRef((props, ref : ForwardedRef<HTMLDivElement>) => {
  const currentTab = useAppSelector((store) => store.ingredientsList.currentTab);
  const dispatch = useAppDispatch();

  const setTab = (tab: string) => {
    dispatch({type: TAB_SWITCH, tab: tab});
    const element = document.getElementById(tab);   
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex" }} className="mb-5" ref={ref}> 
      <Tab value="bun-tab" active={currentTab === "bun-tab"} onClick={() => setTab('bun-tab')}>
        Булки
      </Tab>
      <Tab value="sauce-tab" active={currentTab === "sauce-tab"} onClick={() => setTab('sauce-tab')}>
        Соусы
      </Tab>
      <Tab value="main-tab" active={currentTab === "main-tab"} onClick={() => setTab('main-tab')}>
        Начинки
      </Tab>
    </div>
  );
});


const BurgerIngredients: FC = () => {  
  const ingredients = useAppSelector((store) => store.ingredientsList.ingredients);
  const [ingredient, setModalState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const bunTabRef = useRef<HTMLDivElement>(null);
  const sauceTabRef = useRef<HTMLDivElement>(null);
  const mainTabRef = useRef<HTMLDivElement>(null);

  const currentTab = useAppSelector((store) => store.ingredientsList.currentTab);
  
  const handleScroll = () => {

    const tabsContainerBottom = tabContainerRef.current ? tabContainerRef.current.getBoundingClientRect().bottom : 0;
    const bunContainerTop = bunTabRef.current ? bunTabRef.current.getBoundingClientRect().top : 0;
    const sauceContainerTop = sauceTabRef.current ? sauceTabRef.current.getBoundingClientRect().top : 0;
    const mainContainerTop = mainTabRef.current ? mainTabRef.current.getBoundingClientRect().top: 0;

    const bunDist = bunContainerTop && tabsContainerBottom ? Math.abs(bunContainerTop - tabsContainerBottom): 0;
    const sauceDist = sauceContainerTop && tabsContainerBottom ? Math.abs(sauceContainerTop - tabsContainerBottom): 0;
    const mainDist = mainContainerTop && tabsContainerBottom ? Math.abs(mainContainerTop - tabsContainerBottom): 0;
    
    const minDist = Math.min(bunDist, sauceDist, mainDist);
    const newTab = minDist === bunDist ? "bun-tab" : minDist === sauceDist ? "sauce-tab" : "main-tab";

    if (newTab !== currentTab) {
      return dispatch({type: TAB_SWITCH, newTab});
    }
  };

  return (
    <section className={burgerIngredientsStyles.main}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <BurgerIngredientsTabs ref={tabContainerRef} />
      <div className={"mt-5 custom-scroll " + burgerIngredientsStyles.menu}  onScroll={handleScroll}>
        <div ref={bunTabRef}> 
          <Ingredients
            type="Булки"
            id="bun-tab"   
            onOpen={() => setModalState}
            ingredients={ingredients.filter((item: { type: string; }) => {
              return item.type === "bun";
            })}
            
          />
        </div>
        <div ref={sauceTabRef}>
          <Ingredients
            type="Соусы"
            id="sauce-tab"
            onOpen={() => setModalState}
            ingredients={ingredients.filter((item: { type: string; }) => {
              return item.type === "sauce";
            })}
          />
        </div>      
        <div ref={mainTabRef}>
          <Ingredients
            type="Начинка"
            id="main-tab"
            onOpen={() => setModalState}
            ingredients={ingredients.filter((item: { type: string; }) => {
              return item.type === "main";
            })} 
          />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
