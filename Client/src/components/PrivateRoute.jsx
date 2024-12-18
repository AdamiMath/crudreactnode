import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Verifique no console

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
