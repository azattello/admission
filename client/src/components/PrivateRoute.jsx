import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  // Получаем состояние авторизации из Redux
  const isAuth = useSelector(state => state.user.isAuth);
  
  // Если пользователь авторизован, возвращаем дочерние элементы
  // Иначе перенаправляем на главную страницу
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
