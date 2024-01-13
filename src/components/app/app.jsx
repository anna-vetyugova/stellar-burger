import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from "../app/app.module.css";
import { HomePage } from '../../pages/home';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredientsList } from '../../services/actions/burger-ingredients';
import { DELETE_INGREDIENT_ITEM } from '../../services/actions/ingredient-details';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
    deleteSetItem();
  };

  useEffect(() => {
    dispatch(getIngredientsList());
   }, []);
 
   const deleteSetItem = () => {
    return dispatch({ type: DELETE_INGREDIENT_ITEM });
  };

  const { ingredientsIsLoaded } = useSelector(store => store.ingredientsList);
  console.log(ingredientsIsLoaded);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {ingredientsIsLoaded &&
          <Routes location={background || location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
            {/* <Route path="*" element={<NotFound404 />} /> */}
          </Routes>
        }

        {background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal closeModal={handleModalClose} header={"Детали ингредиента"}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
      </div>
    </>
  );

}

export default App;