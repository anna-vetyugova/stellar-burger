import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from "../app/app.module.css";
import { HomePage, RegisterPage, LoginPage, ForgotPassword, ResetPassword, Profile, Orders, ProfileOrders } from '../../pages';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredientsList } from '../../services/actions/burger-ingredients';
import { DELETE_INGREDIENT_ITEM } from '../../services/actions/ingredient-details';

import { checkUserAuth } from '../../services/actions/user-data';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';


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
    dispatch(checkUserAuth());
   }, [dispatch]);
 
   const deleteSetItem = () => {
    return dispatch({ type: DELETE_INGREDIENT_ITEM });
  };

  const { ingredientsIsLoaded } = useSelector(store => store.ingredientsList);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        {ingredientsIsLoaded &&
          <Routes location={background || location}>
            <Route path='/' element={<HomePage />} />
      
            <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>} />} />
            <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>} />} />
            <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>} />} />
            <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>} />} />
            
            
            <Route path='/profile' element={<OnlyAuth component={<Profile/>} />}>
              <Route index path='/profile/orders' element={<OnlyAuth component={<ProfileOrders/>} />} />
              <Route path='/profile/orders/:orderNumber' element={<OnlyAuth />} />
            </Route>
            
            <Route path='/orders' element={<Orders />} />
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails header={"Детали ингредиента"} />} />
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