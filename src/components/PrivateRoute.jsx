import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../data/auth';

const PrivateRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isLoggedIn() ? element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
