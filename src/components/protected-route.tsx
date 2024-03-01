import React from 'react';
import { type ReactNode } from 'react';
import { useAppSelector } from "./hooks/hooks"
import { Navigate, useLocation } from 'react-router-dom';

type TProteced = {
  children?: ReactNode;
  onlyUnAuth?: boolean;
  component: JSX.Element;
}
const ProtectedRoute = ({ onlyUnAuth = false, component }: TProteced) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }
  if (onlyUnAuth && !user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && user) {
    console.log(`Переход на логин...`);
    console.log(user);
    return <Navigate to="/login" state={{ from: location }}/>;
  }
  
  console.log('Должен вернуть ком');
  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
