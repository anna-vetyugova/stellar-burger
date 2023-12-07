import React, { useState, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredients from "./ingredients/ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import { ingredientsDataList } from "../../utils/prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGREDIENT_ITEM } from "../../services/actions/ingredient-details";
import { TAB_SWITCH } from "../../services/actions/burger-ingredients";


const BurgerIngredientsTabs = React.forwardRef((props, ref) => {
  const currentTab = useSelector((store) => store.ingredientsList.currentTab);
  const dispatch = useDispatch();
  const setTab = (e) => {
    dispatch({type: TAB_SWITCH, tab: e});
    const element = document.getElementById(e);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div style={{ display: "flex" }} className="mb-5" ref={ref}> 
      <Tab id="bun-tab" value="bun-tab" active={currentTab === "bun-tab"} onClick={setTab}>
        Булки
      </Tab>
      <Tab id="sauce-tab" value="sauce-tab" active={currentTab === "sauce-tab"} onClick={setTab}>
        Соусы
      </Tab>
      <Tab id="main-tab" value="main-tab" active={currentTab === "main-tab"} onClick={setTab}>
        Начинки
      </Tab>
    </div>
  );
});

const BurgerIngredients = ({ingredients}) => {
  const [ingredient, setModalState] = useState(false);
  const dispatch = useDispatch();
  
  const tabContainerRef = useRef(null);
  const bunTabRef = useRef(null);
  const sauceTabRef = useRef(null);
  const mainTabRef = useRef(null);

  const currentTab = useSelector((store) => store.ingredientsList.currentTab);
  
  const handleScroll = () => {
    const tabsContainerBottom = tabContainerRef.current.getBoundingClientRect().bottom;
    const bunContainerTop = bunTabRef.current.getBoundingClientRect().top;
    const sauceContainerTop = sauceTabRef.current.getBoundingClientRect().top;
    const mainContainerTop = mainTabRef.current.getBoundingClientRect().top;

    const bunDist = Math.abs(bunContainerTop - tabsContainerBottom);
    const sauceDist = Math.abs(sauceContainerTop - tabsContainerBottom);
    const mainDist = Math.abs(mainContainerTop - tabsContainerBottom);
    
    const minDist = Math.min(bunDist, sauceDist, mainDist);
    const newTab = minDist === bunDist ? "bun-tab" : minDist === sauceDist ? "sauce-tab" : "main-tab";

    if (newTab !== currentTab) {
      return dispatch({type: TAB_SWITCH, newTab});
    }
  };

  const deleteSetItem = () => {
    return dispatch({ type: DELETE_INGREDIENT_ITEM });
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
            onOpen={setModalState}
            ingredients={ingredients.filter((item) => {
              return item.type === "bun";
            })}
            
          />
        </div>
        <div ref={sauceTabRef}>
          <Ingredients
            type="Соусы"
            id="sauce-tab"
            onOpen={setModalState}
            ingredients={ingredients.filter((item) => {
              return item.type === "sauce";
            })}
          />
        </div>      
        <div ref={mainTabRef}>
          <Ingredients
            type="Начинка"
            id="main-tab"
            onOpen={setModalState}
            ingredients={ingredients.filter((item) => {
              return item.type === "main";
            })} 
          />
        </div>
      </div>

      { ingredient && 
          <Modal closeModal={ () => {setModalState(false); deleteSetItem();} } header={"Детали ингредиента"}>
            <IngredientDetails />
          </Modal> }
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsDataList)
};
export default BurgerIngredients;
