import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "../pages/home.module.css"

import BurgerConstructor from "../components/burger-contstructor/burger-contstructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";

export function HomePage() {
  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/> 
        <BurgerConstructor/>
      </DndProvider>
    </main>
  );
}