import React, { useEffect, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from "../app/app.module.css";
import { HomePage, RegisterPage, LoginPage, ForgotPassword, ResetPassword, Profile, Feed, ProfileOrders, ProfileEdit, FeedInfo } from '../../pages';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredientsList } from '../../services/actions/burger-ingredients';

import { DELETE_INGREDIENT_ITEM } from '../../services/constants';

import { checkUserAuth } from '../../services/actions/user-data';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useDispatch } from 'react-redux';

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;
  const { ingredientsIsLoaded } = useAppSelector((store) => store.ingredientsList);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
    deleteSetItem();
  };

  const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(checkUserAuth(accessToken));
   }, [dispatch]);
 
   const deleteSetItem = () => {
    return dispatch({ type: DELETE_INGREDIENT_ITEM });
  };

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
            <Route path='/profile' index element={<OnlyAuth component={<ProfileEdit/>} />} />
              <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders/>} />} />
            </Route>
            
            <Route path='/profile/orders/:number' element={<OnlyAuth component={<FeedInfo modal={false} />}/>} />

            <Route path='/feed' element={<Feed/>}/>
            <Route path='/feed/:number' element={<FeedInfo modal={false} />} />

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
                    <IngredientDetails header={undefined} />
                  </Modal>
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Modal closeModal={handleModalClose}>
                    <FeedInfo modal={true} />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal closeModal={handleModalClose} >
                    <FeedInfo modal={true} />
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