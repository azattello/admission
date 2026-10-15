import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteAdmin = ({ children }) => {
  const isAuthAdmin = useSelector(state => state.admin.isAuthAdmin);

  return isAuthAdmin ? children : <Navigate to="/auth-admin" />;
};

export default PrivateRouteAdmin;
